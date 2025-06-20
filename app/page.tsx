"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism.css";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import type { Identifier } from "@babel/types";
import Link from "next/link";

interface FunctionInfo {
  name: string;
  params: string[];
  returnType?: string;
  isAsync: boolean;
}

type TestFramework = 'jest' | 'mocha' | 'vitest';

// Enhanced function parsing using Babel AST
const parseFunctions = (code: string): FunctionInfo[] => {
  try {
    const ast = parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    const functions: FunctionInfo[] = [];

    traverse(ast, {
      FunctionDeclaration(path) {
        functions.push({
          name: path.node.id?.name || "anonymous",
          params: path.node.params.map(param => {
            if (param.type === "Identifier") return param.name;
            if (param.type === "AssignmentPattern") {
              const left = param.left as Identifier;
              return left.name;
            }
            return "param";
          }),
          isAsync: path.node.async,
        });
      },
      VariableDeclarator(path) {
        if (path.node.init?.type === "ArrowFunctionExpression" || 
            path.node.init?.type === "FunctionExpression") {
          const func = path.node.init;
          const id = path.node.id as Identifier;
          functions.push({
            name: id.name || "anonymous",
            params: func.params.map(param => {
              if (param.type === "Identifier") return param.name;
              if (param.type === "AssignmentPattern") {
                const left = param.left as Identifier;
                return left.name;
              }
              return "param";
            }),
            isAsync: func.async,
          });
        }
      },
    });

    return functions;
  } catch (error) {
    console.error("Error parsing functions:", error);
    return [];
  }
};

// Enhanced test generation with better test cases
const generateTest = (code: string, framework: TestFramework = 'jest', selectedFunction?: string): string => {
  const functions = parseFunctions(code);
  
  if (functions.length === 0) {
    return "Could not parse any functions. Please check your syntax.";
  }

  // If no specific function is selected, use the first one
  const functionInfo = selectedFunction 
    ? functions.find(f => f.name === selectedFunction) 
    : functions[0];

  if (!functionInfo) {
    return `Function "${selectedFunction}" not found. Available functions: ${functions.map(f => f.name).join(', ')}`;
  }

  const { name, params, isAsync } = functionInfo;
  
  // Generate meaningful test cases based on parameter count
  const testCases = generateTestCases(params);
  
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
};

// Get framework-specific setup code
const getFrameworkSetup = (framework: TestFramework): string => {
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
};

// Generate meaningful test cases
const generateTestCases = (params: string[]): Array<{
  description: string;
  args: string[];
  expected: string;
  setup?: string;
}> => {
  const testCases = [];
  
  if (params.length === 0) {
    testCases.push({
      description: 'should work with no parameters',
      args: [],
      expected: 'expected result',
    });
  } else if (params.length === 1) {
    const param = params[0];
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
      },
      {
        description: `should handle undefined ${param}`,
        args: ['undefined'],
        expected: 'undefined',
      }
    );
  } else if (params.length === 2) {
    const [param1, param2] = params;
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
      },
      {
        description: `should handle edge case with empty ${param2}`,
        args: [`"value1"`, `""`],
        expected: '"expected result"',
      },
      {
        description: `should handle both empty parameters`,
        args: [`""`, `""`],
        expected: '"expected result"',
      }
    );
  } else {
    // For functions with many parameters, create a basic test
    const args = params.map((param, index) => `"value${index + 1}"`);
    testCases.push({
      description: 'should work with valid parameters',
      args,
      expected: '"expected result"',
    });
    
    // Add edge case with first parameter empty
    const edgeArgs = [`""`, ...params.slice(1).map((param, index) => `"value${index + 2}"`)];
    testCases.push({
      description: 'should handle edge case with first parameter empty',
      args: edgeArgs,
      expected: '"expected result"',
    });
  }
  
  // Add error case if function has parameters
  if (params.length > 0) {
    testCases.push({
      description: 'should throw error with invalid input',
      args: params.map(() => 'null'),
      expected: 'toThrow()',
      setup: 'expect(() => ',
    });
  }
  
  return testCases;
};

export default function Home() {
  const [code, setCode] = useState(
    `// Function declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a, b) => a + b;

// Async function
async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`
  );
  const [test, setTest] = useState("");
  const [framework, setFramework] = useState<TestFramework>('jest');
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFunctionName, setSelectedFunctionName] = useState<string | undefined>(undefined);

  const handleGenerateTest = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    
    if (!code.trim()) {
      setError("Please enter some code to generate tests for.");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      const generatedTest = generateTest(code, framework, selectedFunctionName);
      setTest(generatedTest);
      setSuccess("Test generated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating the test.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportTest = () => {
    if (!test) {
      setError('Please generate a test first');
      return;
    }

    try {
      const functions = parseFunctions(code);
      const selectedFunction = functions.find(f => f.name === selectedFunctionName);
      const fileName = selectedFunction ? `${selectedFunction.name}.test.js` : 'test.js';
      
      const blob = new Blob([test], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to export test file. Please try again.");
      console.error("Export error:", err);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!test) {
      setError('Please generate a test first');
      return;
    }

    try {
      await navigator.clipboard.writeText(test);
      // Show success message temporarily
      const originalError = error;
      setError("Test copied to clipboard!");
      setTimeout(() => setError(originalError), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard. Please try again.");
      console.error("Copy error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Unit Test Generator</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/documentation" className="text-gray-500 hover:text-gray-900 transition-colors">
                Documentation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold mb-8">Unit Test Generator</h1>
        
        {/* Test Framework Selection */}
        <div className="w-full max-w-4xl mb-6">
          <div className="flex items-center gap-4">
            <label className="text-lg font-semibold">Test Framework:</label>
            <select 
              value={framework} 
              onChange={(e) => setFramework(e.target.value as TestFramework)}
              className="px-4 py-2 border rounded-md bg-white"
            >
              <option value="jest">Jest</option>
              <option value="mocha">Mocha + Chai</option>
              <option value="vitest">Vitest</option>
            </select>
          </div>
        </div>
        
        {/* Function Selection */}
        {(() => {
          const functions = parseFunctions(code);
          if (functions.length > 1) {
            return (
              <div className="w-full max-w-4xl mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-lg font-semibold">Select Function:</label>
                  <select 
                    value={selectedFunctionName || ''} 
                    onChange={(e) => setSelectedFunctionName(e.target.value || undefined)}
                    className="px-4 py-2 border rounded-md bg-white"
                  >
                    <option value="">Auto-select first function</option>
                    {functions.map(func => (
                      <option key={func.name} value={func.name}>
                        {func.name} ({func.params.length} params{func.isAsync ? ', async' : ''})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          }
          return null;
        })()}
        
        {/* Error Display */}
        {error && (
          <div className="w-full max-w-4xl mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        )}
        
        {/* Success Display */}
        {success && (
          <div className="w-full max-w-4xl mb-4">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          </div>
        )}
        
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Code</h2>
            <div className="border rounded-md p-4 bg-gray-50 h-96 overflow-auto">
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
            <button
              onClick={handleGenerateTest}
              disabled={isLoading}
              className={`mt-4 w-full font-bold py-2 px-4 rounded ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-700'
              } text-white`}
            >
              {isLoading ? 'Generating...' : 'Generate Test'}
            </button>
            {test && (
              <button
                onClick={handleExportTest}
                className="mt-2 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Export Test File
              </button>
            )}
            {test && (
              <button
                onClick={handleCopyToClipboard}
                className="mt-2 w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Copy to Clipboard
              </button>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Generated Test ({framework})</h2>
            <div className="border rounded-md p-4 bg-gray-800 text-white h-96 overflow-auto">
              <Editor
                value={test}
                onValueChange={() => {}} // Read-only
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  backgroundColor: 'transparent',
                  color: 'white',
                }}
                readOnly
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}