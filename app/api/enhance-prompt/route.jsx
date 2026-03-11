import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Simple in-memory rate limiting (in production, use Redis or database)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 15; // 15 requests per minute for prompt enhancement

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
        console.log(`Rate limit hit for prompt enhancement, retrying in ${delay}ms... (attempt ${i + 1}/${maxRetries})`);
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
                error: "Rate limit exceeded for prompt enhancement. Please try again in a few moments.",
                retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000),
                suggestion: "Prompt enhancement helps improve results. Consider waiting a moment before trying again."
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
                console.log(`Successfully loaded model for prompt enhancement: ${modelName}`);
                break;
            } catch (modelError) {
                console.log(`Model ${modelName} not available for prompt enhancement, trying next...`);
                if (modelName === modelOptions[modelOptions.length - 1]) {
                    throw new Error("No available Gemini models found for prompt enhancement. Please check your API key and ensure you have access to Gemini models.");
                }
            }
        }
        
        const chatSession = model.startChat({
            history: [],
        });
        
        // Use retry logic for rate limits
        const result = await retryWithBackoff(async () => {
            const response = await chatSession.sendMessage([
                "You are a prompt enhancement expert. Your task is to improve user prompts to get better results from AI code generation.",
                "",
                "Rules:",
                "1. Make the prompt more specific and detailed",
                "2. Add relevant technical requirements and features", 
                "3. Keep it concise and actionable",
                "4. Focus on the core functionality needed",
                "5. Use natural language - avoid overly structured formats",
                "",
                "Enhance this prompt by making it more detailed and specific while keeping it natural and readable:",
                prompt
            ]);
            return response;
        });
        
        const enhancedPrompt = result.response.text();
        
        return NextResponse.json({ 
            enhancedPrompt: enhancedPrompt.trim(),
            success: true 
        });
    } catch (error) {
        console.error("Prompt Enhancement Error:", error);
        
        if (error.status === 429) {
            return NextResponse.json(
                { 
                    error: "Rate limit exceeded for prompt enhancement. Please try again in a few moments.",
                    retryAfter: 60,
                    suggestion: "The AI service is temporarily unavailable. Please try again later.",
                    success: false 
                },
                { status: 429 }
            );
        }
        
        // Check if it's a quota exceeded error
        if (error.message?.includes("quota exceeded") || error.message?.includes("exceeded your current quota")) {
            return NextResponse.json(
                { 
                    error: "AI service quota exceeded. The free tier limit has been reached.",
                    suggestion: "Please try again later or consider upgrading to a paid plan for higher limits.",
                    success: false 
                },
                { status: 429 }
            );
        }
        
        if (error.message?.includes("not found") || error.message?.includes("is not found") || error.message?.includes("No available Gemini models")) {
            return NextResponse.json(
                { 
                    error: "AI model not available for prompt enhancement. Please check your API key configuration.",
                    suggestion: "The Gemini models may not be available with your current API key. Please ensure you have enabled the Gemini API in your Google Cloud project and that your API key has the correct permissions.",
                    success: false 
                },
                { status: 500 }
            );
        }
        
        return NextResponse.json({ 
            error: error.message || "Failed to enhance prompt. Please try again.",
            suggestion: "Try rephrasing your request or try again later.",
            success: false 
        }, { status: 500 });
    }
}
