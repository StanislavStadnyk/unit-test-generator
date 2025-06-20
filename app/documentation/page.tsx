"use client";

/* eslint-disable react/no-unescaped-entities */

import React from "react";
import Link from "next/link";

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-lg text-gray-600">
            Learn how to use the Unit Test Generator effectively
          </p>
        </div>

        {/* Navigation */}
        <nav className="bg-white rounded-lg shadow-sm border p-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Navigation</h2>
          <div className="flex flex-wrap gap-2">
            <a href="#features" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
              Features
            </a>
            <a href="#usage" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
              Usage
            </a>
            <a href="#examples" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
              Examples
            </a>
            <a href="#frameworks" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
              Frameworks
            </a>
          </div>
        </nav>

        {/* Content */}
        <div className="space-y-8">
          <section id="features" className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🤖 AI-Powered Test Generation</h4>
                    <p className="text-gray-600 mb-3">
                      Generate intelligent test cases using advanced AI models. Supports OpenAI GPT-4, Anthropic Claude, Google Gemini, and local AI models.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Comprehensive test case analysis</li>
                      <li>• Edge case detection</li>
                      <li>• Error scenario generation</li>
                      <li>• Type-specific test cases</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🔧 Multiple Test Frameworks</h4>
                    <p className="text-gray-600 mb-3">
                      Generate tests for popular JavaScript testing frameworks with proper syntax and structure.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Jest (recommended)</li>
                      <li>• Mocha + Chai</li>
                      <li>• Vitest</li>
                      <li>• Framework-specific setup code</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">📝 Smart Function Parsing</h4>
                    <p className="text-gray-600 mb-3">
                      Automatically detects and parses JavaScript/TypeScript functions using advanced regex patterns.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Function declarations</li>
                      <li>• Arrow functions</li>
                      <li>• Async functions</li>
                      <li>• Parameter extraction</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">🎨 Modern UI</h4>
                    <p className="text-gray-600 mb-3">
                      Clean, responsive interface with syntax highlighting and real-time feedback.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Syntax highlighting</li>
                      <li>• Dark/light theme support</li>
                      <li>• Responsive design</li>
                      <li>• Copy to clipboard</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Integration</h3>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-600 mb-4">
                    The app now supports AI-powered test generation for more intelligent and comprehensive test cases. 
                    You can configure various AI providers to enhance your test generation experience.
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Supported AI Providers</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm font-medium">OpenAI GPT-4</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-sm font-medium">Anthropic Claude</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span className="text-sm font-medium">Google Gemini</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-sm font-medium">Local AI (Ollama)</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">Setup Required</h5>
                    <p className="text-blue-800 text-sm mb-3">
                      To use AI-powered test generation, you need to configure an AI provider. 
                      See the <a href="/docs/AI_SETUP.md" className="underline font-medium">AI Setup Guide</a> for detailed instructions.
                    </p>
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> If no AI API is configured, the app will use intelligent mock generation as a fallback.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section id="usage" className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guide</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Instructions</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li><strong>Enter your code:</strong> Paste your JavaScript or TypeScript function into the code editor</li>
                  <li><strong>Select framework:</strong> Choose your preferred testing framework (Jest, Mocha, or Vitest)</li>
                  <li><strong>Choose function:</strong> If you have multiple functions, select which one to test</li>
                  <li><strong>Generate tests:</strong> Click the "Generate Test" button to create comprehensive test cases</li>
                  <li><strong>Copy or export:</strong> Use the copy button or export the test file to your project</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Code Formats</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Function declarations: <code className="bg-gray-100 px-1 rounded">function name() {'{}'}</code></li>
                  <li>Arrow functions: <code className="bg-gray-100 px-1 rounded">const name = () =&gt; {'{}'}</code></li>
                  <li>Async functions: <code className="bg-gray-100 px-1 rounded">async function name() {'{}'}</code></li>
                  <li>TypeScript functions: <code className="bg-gray-100 px-1 rounded">function name(param: type): returnType {'{}'}</code></li>
                  <li>Export statements: <code className="bg-gray-100 px-1 rounded">export function name() {'{}'}</code></li>
                </ul>
              </div>
            </div>
          </section>

          <section id="examples" className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Function</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Input:</p>
                  <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                    <code>{"function add(a, b) {\n  return a + b;\n}"}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">TypeScript Function</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Input:</p>
                  <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                    <code>{"export function greet(name: string): string {\n  return `Hello, ${name}!`;\n}"}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Test (Jest)</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Output:</p>
                  <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                    <code>{"describe('greet', () => {\n  it('should handle valid name', () => {\n    const result = greet(\"John Doe\");\n    expect(result).toBe(\"Hello, John Doe!\");\n  });\n\n  it('should handle empty name', () => {\n    const result = greet(\"\");\n    expect(result).toBe(\"Hello, !\");\n  });\n\n  it('should handle special characters in name', () => {\n    const result = greet(\"John@Doe!\");\n    expect(result).toBe(\"Hello, John@Doe!!\");\n  });\n});"}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section id="frameworks" className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Frameworks</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Jest</h3>
                <p className="text-gray-600 text-sm mb-3">
                  The most popular testing framework for JavaScript. Great for React and Node.js projects.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Built-in assertion library</li>
                  <li>• Mocking capabilities</li>
                  <li>• Snapshot testing</li>
                  <li>• Code coverage</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mocha + Chai</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Flexible testing framework with expressive assertions. Popular in Node.js ecosystem.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Flexible test structure</li>
                  <li>• Multiple assertion styles</li>
                  <li>• Plugin ecosystem</li>
                  <li>• Browser support</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Vitest</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Fast unit testing framework powered by Vite. Perfect for modern web projects.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Vite-powered speed</li>
                  <li>• Jest-compatible API</li>
                  <li>• TypeScript support</li>
                  <li>• Watch mode</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Generator
          </Link>
        </div>
      </div>
    </div>
  );
} 