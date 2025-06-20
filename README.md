# Unit Test Generator

A modern web app to automatically generate unit tests for your JavaScript and TypeScript functions. Powered by Next.js, React, Babel, and PrismJS, this tool helps you quickly create comprehensive test suites for your code, supporting multiple test frameworks (Jest, Mocha + Chai, Vitest).

---

## 🚀 Features

- **Automatic Function Parsing**: Detects and parses multiple functions in your code using Babel AST.
- **Smart Test Generation**: Creates meaningful test cases, including edge cases (null, undefined, empty, error cases).
- **Framework Support**: Generate tests for Jest, Mocha + Chai, or Vitest.
- **Multiple Function Support**: Select which function to generate tests for if your code contains more than one.
- **Syntax Highlighting**: Beautiful code editing and test output with PrismJS.
- **Export & Copy**: Download generated tests as files or copy them to your clipboard.
- **Responsive UI**: Built with Tailwind CSS for a clean, modern look.
- **Error Handling**: Helpful error messages and validation throughout the app.

---

## 🖥️ Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/StanislavStadnyk/unit-test-generator.git
cd unit-test-generator
```

### 2. **Install dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Run the development server**
```bash
npm run dev
```

The app will start on [http://localhost:3000](http://localhost:3000) (or the next available port).

---

## ✨ Usage

1. **Paste or write your function(s)** in the code editor.
2. **Select the test framework** (Jest, Mocha + Chai, Vitest).
3. If you have multiple functions, **choose which one to generate tests for**.
4. Click **Generate Test**.
5. **Copy** the generated test or **export** it as a file.

---

## 🛠️ Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Babel Parser & Traverse](https://babeljs.io/docs/babel-parser)
- [PrismJS](https://prismjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

---

## 📄 License

This project is licensed under the MIT License.
