import { NextRequest, NextResponse } from 'next/server';
import { getAIConfig, PROMPT_TEMPLATES, FunctionInfo } from '@/app/lib/ai-config';

interface TestCase {
  description: string;
  args: string[];
  expected: string;
  setup?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { code, framework, selectedFunction } = await request.json();

    // Parse functions using regex (fallback method)
    const functions = parseFunctions(code);
    
    if (functions.length === 0) {
      return NextResponse.json({ 
        error: "Could not parse any functions. Please check your syntax." 
      });
    }

    const functionInfo = selectedFunction 
      ? functions.find(f => f.name === selectedFunction) 
      : functions[0];

    if (!functionInfo) {
      return NextResponse.json({ 
        error: `Function "${selectedFunction}" not found. Available functions: ${functions.map(f => f.name).join(', ')}` 
      });
    }

    // Try to use AI for enhanced test generation
    let testCases: TestCase[] = [];
    
    try {
      testCases = await generateAITestCases(functionInfo, framework);
    } catch (aiError) {
      console.log('AI generation failed, using fallback:', aiError);
      // Fallback to basic test generation
      testCases = generateMockAITestCases(functionInfo);
    }

    const testCode = assembleTestCode(functionInfo, testCases, framework);

    return NextResponse.json({ 
      test: testCode,
      functionInfo,
      testCases: testCases.length
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      error: "Failed to generate test. Please try again." 
    }, { status: 500 });
  }
}

// Parse functions using regex
function parseFunctions(code: string): FunctionInfo[] {
  const functions: FunctionInfo[] = [];
  
  // Function declarations (including TypeScript)
  const functionDeclarations = code.match(/(?:export\s+)?function\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*(?::\s*[^{]*)?\s*{/g);
  if (functionDeclarations) {
    functionDeclarations.forEach(match => {
      const nameMatch = match.match(/(?:export\s+)?function\s+([a-zA-Z0-9_]+)\s*\(/);
      const paramsMatch = match.match(/(?:export\s+)?function\s+[a-zA-Z0-9_]+\s*\(([^)]*)\)/);
      const isAsync = match.includes('async function');
      
      if (nameMatch) {
        const params = paramsMatch ? 
          paramsMatch[1].split(',').map(p => p.trim()).filter(p => p).map(p => {
            // Extract parameter name from TypeScript type annotations
            return p.split(':')[0].trim();
          }) : [];
        functions.push({
          name: nameMatch[1],
          params,
          isAsync,
          code: extractFunctionCode(code, nameMatch[1])
        });
      }
    });
  }
  
  // Arrow functions and function expressions (including TypeScript)
  const arrowFunctions = code.match(/(?:export\s+)?(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s*)?(?:\([^)]*\)\s*=>|function\s*\([^)]*\))/g);
  if (arrowFunctions) {
    arrowFunctions.forEach(match => {
      const nameMatch = match.match(/(?:export\s+)?(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=/);
      const paramsMatch = match.match(/(?:\(([^)]*)\)\s*=>|function\s*\(([^)]*)\))/);
      const isAsync = match.includes('async');
      
      if (nameMatch) {
        const params = paramsMatch ? 
          (paramsMatch[1] || paramsMatch[2] || '').split(',').map(p => p.trim()).filter(p => p).map(p => {
            // Extract parameter name from TypeScript type annotations
            return p.split(':')[0].trim();
          }) : [];
        functions.push({
          name: nameMatch[1],
          params,
          isAsync,
          code: extractFunctionCode(code, nameMatch[1])
        });
      }
    });
  }
  
  return functions;
}

// Extract function code
function extractFunctionCode(code: string, functionName: string): string {
  const lines = code.split('\n');
  let inFunction = false;
  const functionCode: string[] = [];
  let braceCount = 0;
  
  for (const line of lines) {
    if (line.includes(`function ${functionName}`) || 
        line.includes(`${functionName} =`) ||
        line.includes(`export function ${functionName}`)) {
      inFunction = true;
      functionCode.push(line);
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;
      continue;
    }
    
    if (inFunction) {
      functionCode.push(line);
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;
      
      if (braceCount === 0) {
        break;
      }
    }
  }
  
  return functionCode.join('\n');
}

// AI-powered test case generation
async function generateAITestCases(functionInfo: FunctionInfo, framework: string): Promise<TestCase[]> {
  const config = getAIConfig();
  
  if (!config.apiKey) {
    console.log('No API key configured, using mock AI');
    return generateMockAITestCases(functionInfo);
  }

  const prompt = PROMPT_TEMPLATES[config.provider](functionInfo, framework);

  try {
    let response: Response;
    
    switch (config.provider) {
      case 'openai':
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: config.model || 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: config.temperature || 0.3,
            max_tokens: config.maxTokens || 2000,
          }),
        });
        break;
        
      case 'anthropic':
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': config.apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: config.model || 'claude-3-sonnet-20240229',
            max_tokens: config.maxTokens || 2000,
            messages: [{ role: 'user', content: prompt }],
          }),
        });
        break;
        
      case 'gemini':
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.model || 'gemini-pro'}:generateContent?key=${config.apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: config.temperature || 0.3,
              maxOutputTokens: config.maxTokens || 2000,
            },
          }),
        });
        break;
        
      case 'local':
        response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: config.model || 'llama2',
            prompt,
            stream: false,
            options: {
              temperature: config.temperature || 0.3,
            },
          }),
        });
        break;
        
      default:
        throw new Error(`Unsupported AI provider: ${config.provider}`);
    }

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let aiResponse: string;

    // Extract response based on provider
    switch (config.provider) {
      case 'openai':
        aiResponse = data.choices[0]?.message?.content || '';
        break;
      case 'anthropic':
        aiResponse = data.content[0]?.text || '';
        break;
      case 'gemini':
        aiResponse = data.candidates[0]?.content?.parts[0]?.text || '';
        break;
      case 'local':
        aiResponse = data.response || '';
        break;
      default:
        aiResponse = '';
    }

    // Parse JSON response
    try {
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const testCases = JSON.parse(jsonMatch[0]);
        if (Array.isArray(testCases) && testCases.length > 0) {
          return testCases;
        }
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
    }

    // Fallback to mock if parsing fails
    return generateMockAITestCases(functionInfo);
    
  } catch (error) {
    console.error('AI API Error:', error);
    throw new Error('AI service unavailable');
  }
}

// Mock AI test cases (fallback)
function generateMockAITestCases(functionInfo: FunctionInfo): TestCase[] {
  const { params } = functionInfo;
  
  // Analyze function name and parameters for intelligent test generation
  const testCases: TestCase[] = [];
  
  // Basic test cases
  if (params.length === 0) {
    testCases.push({
      description: 'should work with no parameters',
      args: [],
      expected: 'expected result',
    });
  } else if (params.length === 1) {
    const param = params[0];
    
    // Analyze parameter name for better test cases
    if (param.toLowerCase().includes('name')) {
      testCases.push(
        {
          description: `should handle valid ${param}`,
          args: [`"John Doe"`],
          expected: '"Hello, John Doe!"',
        },
        {
          description: `should handle empty ${param}`,
          args: [`""`],
          expected: '"Hello, !"',
        },
        {
          description: `should handle special characters in ${param}`,
          args: [`"John@Doe!"`],
          expected: '"Hello, John@Doe!!"',
        }
      );
    } else if (param.toLowerCase().includes('number') || param.toLowerCase().includes('num')) {
      testCases.push(
        {
          description: `should handle positive ${param}`,
          args: ['42'],
          expected: '42',
        },
        {
          description: `should handle zero ${param}`,
          args: ['0'],
          expected: '0',
        },
        {
          description: `should handle negative ${param}`,
          args: ['-5'],
          expected: '-5',
        }
      );
    } else {
      // Generic test cases
      testCases.push(
        {
          description: `should handle valid ${param}`,
          args: [`"test"`],
          expected: '"expected result"',
        },
        {
          description: `should handle empty ${param}`,
          args: [`""`],
          expected: '"expected result"',
        },
        {
          description: `should handle null ${param}`,
          args: ['null'],
          expected: 'null',
        }
      );
    }
  } else if (params.length === 2) {
    const [param1, param2] = params;
    
    // Analyze parameter combinations
    if (param1.toLowerCase().includes('a') && param2.toLowerCase().includes('b')) {
      testCases.push(
        {
          description: `should add ${param1} and ${param2}`,
          args: ['5', '3'],
          expected: '8',
        },
        {
          description: `should handle zero values`,
          args: ['0', '0'],
          expected: '0',
        },
        {
          description: `should handle negative numbers`,
          args: ['-2', '3'],
          expected: '1',
        }
      );
    } else {
      testCases.push(
        {
          description: `should work with valid ${param1} and ${param2}`,
          args: [`"value1"`, `"value2"`],
          expected: '"expected result"',
        },
        {
          description: `should handle edge case with empty ${param1}`,
          args: [`""`, `"value2"`],
          expected: '"expected result"',
        }
      );
    }
  }
  
  // Error cases
  if (params.length > 0) {
    testCases.push({
      description: 'should throw error with invalid input',
      args: params.map(() => 'undefined'),
      expected: '.toThrow()',
      setup: 'expect(() => ',
    });
  }
  
  return testCases;
}

// Assemble test code
function assembleTestCode(functionInfo: FunctionInfo, testCases: TestCase[], framework: string): string {
  const { name, isAsync } = functionInfo;
  
  const testCasesCode = testCases.map(tc => {
    if (tc.setup) {
      // Error case
      return `  it('${tc.description}', () => {
    ${tc.setup}${name}(${tc.args.join(', ')}))${tc.expected};
  });`;
    } else {
      // Normal case
      return `  it('${tc.description}', ${isAsync ? 'async ' : ''}() => {
    ${tc.setup || ''}
    ${isAsync ? 'const result = await ' : 'const result = '}${name}(${tc.args.join(', ')});
    expect(result).toBe(${tc.expected});
  });`;
    }
  }).join('\n\n');

  const frameworkSetup = getFrameworkSetup(framework);
  
  return `${frameworkSetup}

describe('${name}', () => {
${testCasesCode}
});`;
}

// Get framework-specific setup code
function getFrameworkSetup(framework: string): string {
  switch (framework) {
    case 'jest':
      return "// Jest test file";
    case 'mocha':
      return "const { expect } = require('chai');\n// Mocha test file";
    case 'vitest':
      return "import { describe, it, expect } from 'vitest';\n// Vitest test file";
    default:
      return "// Test file";
  }
}