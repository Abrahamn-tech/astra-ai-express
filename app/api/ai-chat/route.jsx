import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Simple in-memory rate limiting (in production, use Redis or database)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  rateLimitMap.set(ip, validRequests);
  
  if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  // Add current request
  validRequests.push(now);
  return true;
}

// Retry function for rate limits
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        console.log(`Rate limit hit, retrying in ${delay}ms... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
}

export async function POST(req) {
    const { prompt } = await req.json();
    
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { 
                error: "Rate limit exceeded. Please try again in a few moments.",
                retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
            },
            { status: 429 }
        );
    }

    try {
        // Try different model options in order of preference
        let model;
        const modelOptions = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash", 
            "gemini-1.5-flash-latest",
            "gemini-pro"
        ];
        
        for (const modelName of modelOptions) {
            try {
                model = genAI.getGenerativeModel({ model: modelName });
                console.log(`Successfully loaded model: ${modelName}`);
                break;
            } catch (modelError) {
                console.log(`Model ${modelName} not available, trying next...`);
                if (modelName === modelOptions[modelOptions.length - 1]) {
                    throw new Error("No available Gemini models found. Please check your API key and ensure you have access to Gemini models.");
                }
            }
        }
        
        const chatSession = model.startChat({
            history: [],
        });
        
        // Use retry logic for rate limits
        const result = await retryWithBackoff(async () => {
            const response = await chatSession.sendMessage(prompt);
            return response;
        });
        
        const AIResp = result.response.text();
        
        return NextResponse.json({ result: AIResp });
    } catch (error) {
        console.error("AI Chat Error:", error);
        
        if (error.status === 429) {
            return NextResponse.json(
                { 
                    error: "Rate limit exceeded. Please try again in a few moments.",
                    retryAfter: 60
                },
                { status: 429 }
            );
        }
        
        if (error.message?.includes("not found") || error.message?.includes("is not found") || error.message?.includes("No available Gemini models")) {
            return NextResponse.json(
                { 
                    error: "AI model not available. Please check your API key configuration.",
                    suggestion: "The Gemini models may not be available with your current API key. Please ensure you have enabled the Gemini API in your Google Cloud project and that your API key has the correct permissions."
                },
                { status: 500 }
            );
        }
        
        return NextResponse.json(
            { error: error.message || "Failed to generate response" },
            { status: 500 }
        );
    }
}