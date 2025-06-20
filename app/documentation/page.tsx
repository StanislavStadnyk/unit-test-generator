"use client";

/* eslint-disable react/no-unescaped-entities */

import React from "react";
import Link from "next/link";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Unit Test Generator
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/documentation" className="text-blue-600 font-medium">
                Documentation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Documentation</h1>
          
          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Table of Contents</h2>
            <ul className="space-y-2 text-blue-800">
              <li><a href="#overview" className="hover:text-blue-600 transition-colors">• Overview</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">• Features</a></li>
              <li><a href="#getting-started" className="hover:text-blue-600 transition-colors">• Getting Started</a></li>
              <li><a href="#usage" className="hover:text-blue-600 transition-colors">• Usage Guide</a></li>
              <li><a href="#examples" className="hover:text-blue-600 transition-colors">• Examples</a></li>
              <li><a href="#technical" className="hover:text-blue-600 transition-colors">• Technical Details</a></li>
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">• FAQ</a></li>
            </ul>
          </div>

          {/* Overview Section */}
          <section id="overview" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="text-lg text-gray-700 mb-4">
              The Unit Test Generator is a modern web application that automatically generates comprehensive unit tests 
              for your JavaScript and TypeScript functions. It uses reliable regex parsing techniques to understand your code 
              structure and creates intelligent test cases that cover normal usage, edge cases, and error scenarios.
            </p>
            <p className="text-lg text-gray-700">
              Built with Next.js 15, React 19, and Tailwind CSS, this tool supports multiple testing frameworks including Jest, 
              Mocha + Chai, and Vitest, making it versatile for different project requirements. The app is production-ready 
              and successfully builds for deployment to platforms like Netlify and Vercel.
            </p>
          </section>

          {/* Features Section */}
          <section id="features" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🔍 Smart Parsing</h3>
                <p className="text-gray-700">
                  Uses reliable regex patterns to accurately parse function declarations, expressions, arrow functions, and async functions.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🧪 Intelligent Tests</h3>
                <p className="text-gray-700">
                  Generates comprehensive test cases including edge cases (null, undefined, empty strings) and error scenarios.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ Multiple Frameworks</h3>
                <p className="text-gray-700">
                  Support for Jest, Mocha + Chai, and Vitest with framework-specific syntax and imports.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">📁 Export Options</h3>
                <p className="text-gray-700">
                  Download generated tests as files or copy them to clipboard with one click.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🎨 Modern UI</h3>
                <p className="text-gray-700">
                  Clean, responsive interface with syntax highlighting and real-time feedback.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🚀 Production Ready</h3>
                <p className="text-gray-700">
                  Successfully builds and deploys to platforms like Netlify and Vercel with optimized performance.
                </p>
              </div>
            </div>
          </section>

          {/* Getting Started Section */}
          <section id="getting-started" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Navigate to the <Link href="/" className="text-blue-600 hover:underline">main page</Link></li>
                <li>Paste your JavaScript or TypeScript function into the code editor</li>
                <li>Select your preferred test framework (Jest, Mocha + Chai, or Vitest)</li>
                <li>Click &quot;Generate Test&quot; to create your test suite</li>
                <li>Copy the generated test or download it as a file</li>
              </ol>
            </div>
          </section>

          {/* Usage Guide Section */}
          <section id="usage" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Usage Guide</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Supported Function Types</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Function declarations
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow functions
const add = (a, b) => a + b;

// Async functions
async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

// Function expressions
const multiply = function(x, y) {
  return x * y;
};`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Test Framework Selection</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Jest</h4>
                    <p className="text-sm text-blue-800">Most popular testing framework with built-in assertions</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Mocha + Chai</h4>
                    <p className="text-sm text-green-800">Flexible testing framework with expressive assertions</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Vitest</h4>
                    <p className="text-sm text-purple-800">Fast unit testing framework for Vite projects</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Examples Section */}
          <section id="examples" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Examples</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Simple Function</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Input:</p>
                  <pre className="text-sm text-gray-800 mb-4">
{`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
                  </pre>
                  <p className="text-sm text-gray-600 mb-2">Generated Test (Jest):</p>
                  <pre className="text-sm text-gray-800">
{`describe(&apos;greet&apos;, () => {
  it(&apos;should handle valid name&apos;, () => {
    const result = greet("test");
    expect(result).toBe("expected result");
  });

  it(&apos;should handle empty name&apos;, () => {
    const result = greet("");
    expect(result).toBe("expected result");
  });

  it(&apos;should handle null name&apos;, () => {
    const result = greet(null);
    expect(result).toBe(null);
  });

  it(&apos;should handle undefined name&apos;, () => {
    const result = greet(undefined);
    expect(result).toBe(undefined);
  });

  it(&apos;should throw error with invalid input&apos;, () => {
    expect(() => greet(null)).toThrow();
  });
});`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Details Section */}
          <section id="technical" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Architecture</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Frontend:</strong> Next.js 15 with React 19 and App Router</li>
                  <li><strong>Parsing:</strong> Regex-based parsing for function analysis</li>
                  <li><strong>Editor:</strong> react-simple-code-editor with PrismJS syntax highlighting</li>
                  <li><strong>Styling:</strong> Tailwind CSS for responsive design</li>
                  <li><strong>TypeScript:</strong> Full TypeScript support with proper type definitions</li>
                  <li><strong>Build:</strong> Optimized for production deployment</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How It Works</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Code is parsed using regex patterns to identify function declarations and expressions</li>
                  <li>Function metadata (name, parameters, async status) is extracted</li>
                  <li>Test cases are generated based on parameter count and types</li>
                  <li>Framework-specific test code is assembled with proper syntax</li>
                  <li>Generated test is displayed with syntax highlighting</li>
                  <li>Export options allow downloading or copying the generated tests</li>
                </ol>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Does it support TypeScript?</h3>
                <p className="text-gray-700">Yes! The app fully supports both JavaScript and TypeScript functions with proper type handling and parsing.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use the generated tests in production?</h3>
                <p className="text-gray-700">The generated tests are a great starting point, but you should review and adapt them for your specific logic and edge cases.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I add support for more test frameworks?</h3>
                <p className="text-gray-700">You can extend the test generation logic in the source code to include additional frameworks by updating the framework setup and assertion syntax.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if my function has complex logic?</h3>
                <p className="text-gray-700">The generator creates basic test cases. For complex logic, you'll need to add specific test cases that cover your business logic and edge cases.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I deploy this app to Netlify or Vercel?</h3>
                <p className="text-gray-700">Absolutely! The app is production-ready and successfully builds for deployment. Just connect your repository and deploy with the default Next.js settings.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is the app open source?</h3>
                <p className="text-gray-700">Yes! The project is open source and available on GitHub. Contributions are welcome!</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Ready to Generate Tests?</h2>
            <p className="text-blue-800 mb-6">
              Start creating comprehensive unit tests for your JavaScript and TypeScript functions today!
            </p>
            <Link 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try the Unit Test Generator
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Unit Test Generator - Automatically generate comprehensive unit tests for your JavaScript and TypeScript functions.
          </p>
          <p className="text-gray-500 mt-2">
            Built with Next.js, React, and Regex parsing
          </p>
        </div>
      </footer>
    </div>
  );
} 