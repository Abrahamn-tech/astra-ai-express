import axios from 'axios';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

/**
 * Send a request to OpenRouter API
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options for the request
 * @returns {Promise<string>} - The AI response text
 */
export async function sendOpenRouterRequest(messages, options = {}) {
  if (!OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY environment variable is not set');
  }

  try {
    const requestData = {
      model: 'openrouter/free',
      messages: messages,
      ...options
    };

    const response = await axios.post(OPENROUTER_API_URL, requestData, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Astra AI'
      }
    });

    if (!response.data || !response.data.choices || !response.data.choices[0]) {
      throw new Error('Invalid response from OpenRouter API');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    
    if (error.response) {
      // Handle API errors
      const status = error.response.status;
      const message = error.response.data?.error?.message || error.message;
      
      if (status === 429) {
        throw new Error(`Rate limit exceeded: ${message}`);
      } else if (status === 401) {
        throw new Error(`Authentication failed: ${message}`);
      } else if (status === 403) {
        throw new Error(`Access forbidden: ${message}`);
      } else {
        throw new Error(`OpenRouter API error (${status}): ${message}`);
      }
    } else if (error.request) {
      throw new Error('No response from OpenRouter API. Please check your network connection.');
    } else {
      throw new Error(`OpenRouter service error: ${error.message}`);
    }
  }
}
