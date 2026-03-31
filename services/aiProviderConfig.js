// AI Provider Configuration
// Default provider is set to 'openrouter' as required
export const AI_PROVIDER = process.env.AI_PROVIDER || 'openrouter';

// Available providers
export const AI_PROVIDERS = {
  OPENROUTER: 'openrouter',
  GEMINI: 'gemini'
};

/**
 * Get the current AI provider
 * @returns {string} - Current provider name
 */
export function getCurrentAIProvider() {
  return AI_PROVIDER;
}

/**
 * Check if OpenRouter is the current provider
 * @returns {boolean} - True if OpenRouter is active
 */
export function isOpenRouterProvider() {
  return getCurrentAIProvider() === AI_PROVIDERS.OPENROUTER;
}

/**
 * Check if Gemini is the current provider
 * @returns {boolean} - True if Gemini is active
 */
export function isGeminiProvider() {
  return getCurrentAIProvider() === AI_PROVIDERS.GEMINI;
}

/**
 * Validate that the required environment variables are set for the current provider
 * @returns {boolean} - True if required env vars are set
 */
export function validateProviderEnvironment() {
  if (isOpenRouterProvider()) {
    return !!process.env.OPENROUTER_API_KEY;
  } else if (isGeminiProvider()) {
    return !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }
  return false;
}

/**
 * Get provider-specific error message for missing API keys
 * @returns {string} - Error message
 */
export function getProviderErrorMessage() {
  if (isOpenRouterProvider() && !process.env.OPENROUTER_API_KEY) {
    return 'OPENROUTER_API_KEY environment variable is not set';
  } else if (isGeminiProvider() && !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return 'NEXT_PUBLIC_GEMINI_API_KEY environment variable is not set';
  }
  return 'Unknown provider configuration error';
}
