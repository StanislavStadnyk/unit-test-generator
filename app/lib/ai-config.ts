// AI API Configuration
// This file contains configuration for various AI services that can be used for test generation

export interface FunctionInfo {
  name: string;
  params: string[];
  isAsync: boolean;
  code: string;
}

export interface AIConfig {
  provider: 'openai' | 'anthropic' | 'gemini' | 'local';
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

// Default configuration
export const defaultAIConfig: AIConfig = {
  provider: 'openai',
  model: 'gpt-4',
  temperature: 0.3,
  maxTokens: 2000,
};

// AI Service Providers
export const AI_PROVIDERS = {
  OPENAI: {
    name: 'OpenAI GPT-4',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    baseUrl: 'https://api.openai.com/v1/chat/completions',
  },
  ANTHROPIC: {
    name: 'Anthropic Claude',
    models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
    baseUrl: 'https://api.anthropic.com/v1/messages',
  },
  GEMINI: {
    name: 'Google Gemini',
    models: ['gemini-pro', 'gemini-pro-vision'],
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
  },
  LOCAL: {
    name: 'Local AI Model',
    models: ['llama2', 'mistral', 'codellama'],
    baseUrl: 'http://localhost:11434/api/generate', // Ollama default
  },
};

// Environment variable mapping
export const getAIConfig = (): AIConfig => {
  const provider = (process.env.AI_PROVIDER as AIConfig['provider']) || 'openai';
  
  return {
    provider,
    apiKey: process.env[`${provider.toUpperCase()}_API_KEY`],
    model: process.env.AI_MODEL || defaultAIConfig.model,
    temperature: parseFloat(process.env.AI_TEMPERATURE || '0.3'),
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2000'),
  };
};

// Test generation prompt templates
export const PROMPT_TEMPLATES = {
  openai: (functionInfo: FunctionInfo, framework: string) => `Analyze this JavaScript/TypeScript function and generate comprehensive unit tests for ${framework}:

Function: ${functionInfo.name}
Parameters: ${functionInfo.params.join(', ')}
Async: ${functionInfo.isAsync}
Code:
${functionInfo.code}

Generate test cases that include:
1. Normal usage with valid inputs
2. Edge cases (empty strings, null, undefined)
3. Error cases for invalid inputs
4. Type-specific test cases based on parameter names

Return the test cases as a JSON array with this structure:
[
  {
    "description": "test description",
    "args": ["arg1", "arg2"],
    "expected": "expected result",
    "setup": "optional setup code"
  }
]`,

  anthropic: (functionInfo: FunctionInfo, framework: string) => `You are a senior software engineer specializing in unit testing. Analyze the following JavaScript/TypeScript function and generate comprehensive unit tests for ${framework}.

Function Details:
- Name: ${functionInfo.name}
- Parameters: ${functionInfo.params.join(', ')}
- Async: ${functionInfo.isAsync}
- Code:
${functionInfo.code}

Please generate test cases that cover:
1. Happy path scenarios with valid inputs
2. Edge cases (empty strings, null, undefined, boundary values)
3. Error scenarios for invalid inputs
4. Type-specific test cases based on parameter names and expected behavior

Format your response as a JSON array with the following structure:
[
  {
    "description": "clear test description",
    "args": ["argument1", "argument2"],
    "expected": "expected result or assertion",
    "setup": "optional setup code if needed"
  }
]

Focus on creating meaningful, realistic test cases that would actually validate the function's behavior.`,

  gemini: (functionInfo: FunctionInfo, framework: string) => `Generate unit tests for this JavaScript/TypeScript function using ${framework}.

Function: ${functionInfo.name}
Parameters: ${functionInfo.params.join(', ')}
Async: ${functionInfo.isAsync}
Code:
${functionInfo.code}

Create comprehensive test cases covering:
- Normal operation with valid inputs
- Edge cases and boundary conditions
- Error handling for invalid inputs
- Type-specific scenarios based on parameter names

Return as JSON array:
[
  {
    "description": "test description",
    "args": ["arg1", "arg2"],
    "expected": "expected result",
    "setup": "optional setup"
  }
]`,

  local: (functionInfo: FunctionInfo, framework: string) => `Generate unit tests for ${framework}:

Function: ${functionInfo.name}
Parameters: ${functionInfo.params.join(', ')}
Async: ${functionInfo.isAsync}
Code:
${functionInfo.code}

Create test cases for:
1. Valid inputs
2. Edge cases
3. Error conditions
4. Type-specific scenarios

Return JSON:
[
  {
    "description": "test description",
    "args": ["arg1", "arg2"],
    "expected": "expected result",
    "setup": "optional setup"
  }
]`,
}; 