# Unit Test Generator

A modern web application for automatically generating unit tests for JavaScript and TypeScript functions. Features AI-powered test generation with support for multiple AI providers and intelligent fallback mechanisms.

## 🚀 Features

- **🤖 AI-Powered Test Generation**: Generate intelligent test cases using OpenAI GPT-4, Anthropic Claude, Google Gemini, or local AI models
- **🔧 Multiple Test Frameworks**: Support for Jest, Mocha + Chai, and Vitest
- **📝 Smart Function Parsing**: Advanced regex-based parsing for function declarations, arrow functions, and async functions
- **🎨 Modern UI**: Clean, responsive interface with navigation bar and syntax highlighting
- **📁 Export Options**: Download tests as files or copy to clipboard
- **🚀 Production Ready**: Optimized for deployment on Netlify, Vercel, and other platforms
- **✅ TypeScript Support**: Full support for TypeScript functions with type annotations and export statements

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/unit-test-generator.git
   cd unit-test-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤖 AI Integration

The app supports AI-powered test generation for more comprehensive and intelligent test cases. You can configure various AI providers:

### Supported AI Providers

- **OpenAI GPT-4** (Recommended)
- **Anthropic Claude**
- **Google Gemini**
- **Local AI Models** (via Ollama)

### Setup AI Integration

1. Create a `.env.local` file in your project root
2. Configure your preferred AI provider:

```bash
# OpenAI (Recommended)
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
AI_MODEL=gpt-4

# Or use other providers
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

For detailed setup instructions, see the [AI Setup Guide](docs/AI_SETUP.md).

**Note**: If no AI API is configured, the app will use intelligent mock generation as a fallback.

## 📖 Usage

1. **Enter your code** in the editor
2. **Select a test framework** (Jest, Mocha, or Vitest)
3. **Choose a function** to test (if multiple functions are detected)
4. **Generate tests** with AI-powered analysis
5. **Copy or download** the generated test code

### Example

Input:
```javascript
function isPalindrome(str) {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
```

AI-generated output:
```javascript
describe('isPalindrome', () => {
  it('should return true for a valid palindrome', () => {
    const result = isPalindrome('racecar');
    expect(result).toBe(true);
  });

  it('should return false for a non-palindrome', () => {
    const result = isPalindrome('hello');
    expect(result).toBe(false);
  });

  it('should return true for an empty string', () => {
    const result = isPalindrome('');
    expect(result).toBe(true);
  });

  it('should throw error for null input', () => {
    expect(() => isPalindrome(null)).toThrow('Input must be a string');
  });

  it('should throw error for undefined input', () => {
    expect(() => isPalindrome(undefined)).toThrow('Input must be a string');
  });
});
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Navigation**: Next.js Link components for optimal performance
- **AI Integration**: OpenAI, Anthropic, Google Gemini, Ollama
- **Deployment**: Netlify/Vercel ready

## 📚 Documentation

- [Usage Guide](docs/USAGE.md) - Detailed usage instructions
- [AI Setup Guide](docs/AI_SETUP.md) - AI provider configuration
- [API Documentation](docs/API.md) - API endpoints and usage

## 🚀 Deployment

The app is optimized for deployment on modern platforms:

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Vercel
```bash
vercel
```

### Environment Variables
Set the following environment variables in your deployment platform:
- `AI_PROVIDER` - Your chosen AI provider
- `OPENAI_API_KEY` - OpenAI API key (if using OpenAI)
- `ANTHROPIC_API_KEY` - Anthropic API key (if using Claude)
- `GEMINI_API_KEY` - Google Gemini API key (if using Gemini)

## 🔧 Recent Improvements

- ✅ **Fixed test generation syntax**: Corrected `.toThrow()` method calls in generated tests
- ✅ **TypeScript compatibility**: Resolved null assignment issues for better TypeScript support
- ✅ **Navigation bar**: Added consistent navigation with Next.js Link components
- ✅ **Build optimization**: Resolved SSR issues and improved build performance
- ✅ **Mobile responsiveness**: Enhanced UI for better mobile experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI integration powered by OpenAI, Anthropic, and Google
- Icons from [Heroicons](https://heroicons.com/)
