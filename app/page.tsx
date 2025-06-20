"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FunctionInfo {
  name: string;
  params: string[];
  returnType?: string;
  isAsync: boolean;
}

type TestFramework = 'jest' | 'mocha' | 'vitest';

// Enhanced function parsing using regex (simplified for build compatibility)
const parseFunctions = async (code: string): Promise<FunctionInfo[]> => {
  try {
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
          });
        }
      });
    }
    
    return functions;
  } catch (error) {
    console.error("Error parsing functions:", error);
    return [];
  }
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
  const [functions, setFunctions] = useState<FunctionInfo[]>([]);

  // Load functions when code changes
  React.useEffect(() => {
    const loadFunctions = async () => {
      const funcs = await parseFunctions(code);
      setFunctions(funcs);
    };
    loadFunctions();
  }, [code]);

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
      // Use AI-powered API for test generation
      const response = await fetch('/api/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          framework,
          selectedFunction: selectedFunctionName,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setTest(data.test);
        setSuccess(`Test generated successfully with ${data.testCases} test cases!`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while generating the test.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportTest = async () => {
    if (!test) return;
    
    const blob = new Blob([test], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFunctionName || 'test'}.test.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    if (!test) return;
    
    try {
      await navigator.clipboard.writeText(test);
      setSuccess("Test copied to clipboard!");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">Unit Test Generator</h1>
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                  Home
                </Link>
                <Link href="/documentation" className="text-gray-600 hover:text-gray-700">
                  Documentation
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <Link href="/documentation" className="text-blue-600 hover:text-blue-700 font-medium">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unit Test Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate comprehensive unit tests for your JavaScript and TypeScript functions with AI-powered analysis
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Code</h2>
              
              {/* Framework Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Framework
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as TestFramework)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="jest">Jest</option>
                  <option value="mocha">Mocha + Chai</option>
                  <option value="vitest">Vitest</option>
                </select>
              </div>

              {/* Function Selection */}
              {functions.length > 1 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Function
                  </label>
                  <select
                    value={selectedFunctionName || ""}
                    onChange={(e) => setSelectedFunctionName(e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All functions</option>
                    {functions.map((func) => (
                      <option key={func.name} value={func.name}>
                        {func.name}({func.params.join(", ")})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Code Editor */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Code
                </label>
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 md:h-80 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Paste your JavaScript or TypeScript function here..."
                  />
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateTest}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? "Generating..." : "Generate Test"}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Generated Test</h2>
                {test && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCopyToClipboard}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Copy
                    </button>
                    <button
                      onClick={handleExportTest}
                      className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Export
                    </button>
                  </div>
                )}
              </div>

              {/* Test Output */}
              <div className="relative">
                <pre className="w-full h-64 md:h-80 p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-xs md:text-sm overflow-auto whitespace-pre-wrap">
                  <code className="language-javascript">
                    {test || "Generated test will appear here..."}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {(error || success) && (
          <div className="mb-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {success}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            Built with Next.js and AI-powered test generation. 
            <Link href="/documentation" className="text-blue-600 hover:text-blue-700 ml-1">
              View Documentation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}