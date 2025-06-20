# AI API Setup Guide

This guide explains how to configure AI services for enhanced test generation in the Unit Test Generator.

## Supported AI Providers

The app supports multiple AI providers for generating intelligent test cases:

1. **OpenAI GPT-4** (Recommended)
2. **Anthropic Claude**
3. **Google Gemini**
4. **Local AI Models** (via Ollama)

## Environment Variables

Create a `.env.local` file in your project root with the following configuration:

```bash
# AI Provider (openai, anthropic, gemini, local)
AI_PROVIDER=openai

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
AI_MODEL=gpt-4
AI_TEMPERATURE=0.3
AI_MAX_TOKENS=2000

# Anthropic Configuration (Claude)
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# AI_MODEL=claude-3-sonnet-20240229

# Google Gemini Configuration
# GEMINI_API_KEY=your_gemini_api_key_here
# AI_MODEL=gemini-pro

# Local AI Configuration (Ollama)
# AI_PROVIDER=local
# AI_MODEL=llama2
```

## Setup Instructions

### 1. OpenAI GPT-4 (Recommended)

1. Sign up at [OpenAI](https://platform.openai.com/)
2. Create an API key in your dashboard
3. Set the environment variables:
   ```bash
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-your-api-key-here
   AI_MODEL=gpt-4
   ```

### 2. Anthropic Claude

1. Sign up at [Anthropic](https://console.anthropic.com/)
2. Create an API key
3. Set the environment variables:
   ```bash
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-your-api-key-here
   AI_MODEL=claude-3-sonnet-20240229
   ```

### 3. Google Gemini

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set the environment variables:
   ```bash
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your-gemini-api-key-here
   AI_MODEL=gemini-pro
   ```

### 4. Local AI (Ollama)

1. Install [Ollama](https://ollama.ai/)
2. Pull a model: `ollama pull llama2`
3. Set the environment variables:
   ```bash
   AI_PROVIDER=local
   AI_MODEL=llama2
   ```

## Configuration Options

### AI Models

Each provider supports different models:

**OpenAI:**
- `gpt-4` (recommended)
- `gpt-4-turbo`
- `gpt-3.5-turbo`

**Anthropic:**
- `claude-3-opus-20240229`
- `claude-3-sonnet-20240229` (recommended)
- `claude-3-haiku-20240307`

**Gemini:**
- `gemini-pro` (recommended)
- `gemini-pro-vision`

**Local (Ollama):**
- `llama2`
- `mistral`
- `codellama`

### Temperature

Controls randomness in AI responses:
- `0.0` - Very deterministic
- `0.3` - Balanced (recommended)
- `1.0` - Very creative

### Max Tokens

Maximum length of AI response:
- `1000` - Short responses
- `2000` - Balanced (recommended)
- `4000` - Detailed responses

## How It Works

1. **Function Analysis**: The AI analyzes your JavaScript/TypeScript function
2. **Test Generation**: Creates comprehensive test cases including:
   - Normal usage scenarios
   - Edge cases (empty strings, null, undefined)
   - Error conditions
   - Type-specific test cases
3. **Framework Support**: Generates tests for Jest, Mocha, or Vitest
4. **Fallback**: If AI is unavailable, uses intelligent mock generation

## Example

Input function:
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

AI-generated tests:
```javascript
describe('greet', () => {
  it('should handle valid name', () => {
    const result = greet("John Doe");
    expect(result).toBe("Hello, John Doe!");
  });

  it('should handle empty name', () => {
    const result = greet("");
    expect(result).toBe("Hello, !");
  });

  it('should handle special characters in name', () => {
    const result = greet("John@Doe!");
    expect(result).toBe("Hello, John@Doe!!");
  });
});
```

## Troubleshooting

### No API Key Configured
If you don't set up an AI API key, the app will use intelligent mock generation as a fallback.

### API Errors
- Check your API key is correct
- Verify you have sufficient credits/quota
- Ensure the model name is correct for your provider

### Local AI Issues
- Make sure Ollama is running: `ollama serve`
- Verify the model is downloaded: `ollama list`
- Check the model name matches your configuration

## Security Notes

- Never commit your `.env.local` file to version control
- Use environment variables in production deployments
- Consider using a secrets management service for production

## Cost Considerations

- **OpenAI**: ~$0.03 per 1K tokens for GPT-4
- **Anthropic**: ~$0.015 per 1K tokens for Claude Sonnet
- **Gemini**: Free tier available, then ~$0.001 per 1K tokens
- **Local**: Free but requires local compute resources 