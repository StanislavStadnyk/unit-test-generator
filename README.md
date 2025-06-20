# Unit Test Generator

A modern web app to automatically generate unit tests for your JavaScript and TypeScript functions. Built with Next.js, React, and regex parsing, this tool helps you quickly create comprehensive test suites for your code, supporting multiple test frameworks (Jest, Mocha + Chai, Vitest).

---

## 🚀 Features

- **Smart Function Parsing**: Detects and parses multiple functions using reliable regex patterns
- **Intelligent Test Generation**: Creates meaningful test cases, including edge cases (null, undefined, empty, error cases)
- **Framework Support**: Generate tests for Jest, Mocha + Chai, or Vitest
- **Multiple Function Support**: Select which function to generate tests for if your code contains more than one
- **Syntax Highlighting**: Beautiful code editing and test output with PrismJS
- **Export & Copy**: Download generated tests as files or copy them to your clipboard
- **Responsive UI**: Built with Tailwind CSS for a clean, modern look
- **Error Handling**: Helpful error messages and validation throughout the app
- **Production Ready**: Successfully builds and deploys to platforms like Netlify

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

### 4. **Build for production**
```bash
npm run build
```

---

## ✨ Usage

1. **Paste or write your function(s)** in the code editor
2. **Select the test framework** (Jest, Mocha + Chai, Vitest)
3. If you have multiple functions, **choose which one to generate tests for**
4. Click **Generate Test** to create your test suite
5. **Copy** the generated test or **export** it as a file

---

## 🛠️ Tech Stack
- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PrismJS](https://prismjs.com/) - Syntax highlighting
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

## 📚 Documentation

For detailed documentation, visit the [Documentation Page](/documentation) in the app or check the [docs folder](./docs/) in the repository.

---

## 🚀 Deployment

The app is ready for deployment to various platforms:

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect Next.js settings
3. Deploy with one click!

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

---

## 📄 License

This project is licensed under the MIT License.
