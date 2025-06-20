# Unit Test Generator Documentation

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [UI Walkthrough](#ui-walkthrough)
- [How It Works](#how-it-works)
- [Technical Architecture](#technical-architecture)
- [Extending the App](#extending-the-app)
- [FAQ](#faq)

---

## Overview

Unit Test Generator is a web application that helps developers automatically generate unit tests for JavaScript and TypeScript functions. It supports multiple test frameworks and provides a modern, user-friendly interface for rapid test creation.

---

## Features
- **Automatic Function Detection**: Parses your code and detects all functions (declarations, expressions, arrow functions, async functions).
- **Smart Test Generation**: Generates comprehensive test cases, including edge cases (null, undefined, empty, error cases).
- **Framework Support**: Jest, Mocha + Chai, and Vitest.
- **Multiple Function Support**: Select which function to generate tests for if your code contains more than one.
- **Syntax Highlighting**: Editor and output use PrismJS for clear code visualization.
- **Export & Copy**: Download generated tests as files or copy them to your clipboard.
- **Responsive UI**: Built with Tailwind CSS.
- **Error Handling**: Helpful error messages and validation throughout the app.

---

## UI Walkthrough

1. **Code Editor**: Paste or write your JavaScript/TypeScript functions. Supports multiple functions in one file.
2. **Test Framework Selector**: Choose between Jest, Mocha + Chai, or Vitest.
3. **Function Selector**: If multiple functions are detected, select which one to generate tests for.
4. **Generate Test Button**: Click to generate a test suite for the selected function.
5. **Test Output**: View the generated test code with syntax highlighting.
6. **Export/Copy Buttons**: Download the test as a file or copy it to your clipboard.
7. **Error/Success Messages**: Get instant feedback on your actions.

---

## How It Works

1. **Parsing**: Uses Babel's parser and traverse to convert your code into an AST and extract all function definitions.
2. **Test Case Generation**: For each function, generates a set of test cases based on the number and type of parameters, including edge cases and error scenarios.
3. **Test Assembly**: Assembles the test cases into a test suite using the selected framework's syntax.
4. **Output**: Displays the generated test code with syntax highlighting and provides export/copy options.

---

## Technical Architecture

- **Frontend**: Next.js (React, App Router)
- **Editor**: `react-simple-code-editor` with PrismJS for syntax highlighting
- **Parsing**: `@babel/parser` and `@babel/traverse` for AST analysis
- **Styling**: Tailwind CSS
- **Test Generation**: Custom logic for generating test cases and assembling test files

### Key Files
- `app/page.tsx`: Main UI and logic for parsing, test generation, and user interaction
- `types/prismjs.d.ts`: TypeScript types for PrismJS
- `.gitignore`: Ensures no build artifacts or dependencies are committed

---

## Extending the App

- **Add More Frameworks**: Extend the `getFrameworkSetup` and test generation logic in `app/page.tsx`.
- **Improve Test Case Logic**: Enhance the `generateTestCases` function to handle more complex scenarios or custom heuristics.
- **Add Language Support**: Integrate additional Babel plugins or parsers for other languages.
- **UI Enhancements**: Add dark mode, more export options, or integrate with online editors.

---

## FAQ

**Q: Does it support TypeScript?**
A: Yes, both JavaScript and TypeScript functions are supported.

**Q: Can I use this for production code?**
A: The generated tests are a great starting point, but you should review and adapt them for your specific logic and edge cases.

**Q: How do I add more test frameworks?**
A: Update the test generation logic in `app/page.tsx` to include your desired framework's syntax.

**Q: Are dependencies like `node_modules` included in the repository?**
A: No, `.gitignore` ensures only source code and essential files are tracked.

**Q: How do I contribute?**
A: Fork the repo, create a branch, make your changes, and open a pull request! 