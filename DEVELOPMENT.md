# Development Guide

This guide covers the development setup, build process, and release workflow for the Loan Calculator web component.

## Prerequisites

- Node.js 18.x or 20.x
- npm 8.x or higher
- Git

## Development Setup

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/loan-calculator.git
cd loan-calculator
npm install
```

### 2. Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Preview production build
npm run preview
```

### 3. Development Server

The development server runs at `http://localhost:5173` and includes:

- Hot module replacement (HMR)
- React component demo
- Web component demo
- CDN usage examples

## Project Structure

```
loan-calculator/
├── src/
│   ├── __tests__/                 # Test files
│   │   └── LoanCalculator.test.tsx
│   ├── LoanCalculator.tsx         # Main React component
│   ├── LoanCalculatorElement.ts   # Web component wrapper
│   ├── App.tsx                    # Demo application
│   ├── index.ts                   # Main entry point
│   ├── index.css                  # Tailwind CSS imports
│   ├── main.tsx                   # React app entry
│   └── setupTests.ts              # Jest setup
├── dist/                          # Build output
├── .github/
│   └── workflows/
│       ├── ci.yml                 # CI workflow
│       └── release.yml            # Release workflow
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── vite.config.ts                 # Vite build configuration
├── jest.config.json               # Jest test configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Package configuration
```

## Building

### Development Build

```bash
npm run dev
```

This starts a development server with:
- React Fast Refresh for instant updates
- Tailwind CSS with JIT compilation
- TypeScript type checking
- Error overlay

### Production Build

```bash
npm run build
```

This creates optimized bundles:
- `dist/loan-calculator.es.js` - ES module bundle
- `dist/loan-calculator.umd.js` - UMD bundle for CDN
- `dist/loan-calculator.css` - Compiled CSS with Tailwind
- Type definitions in `dist/`

### Build Configuration

The build uses Vite with the following configuration:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LoanCalculator',
      fileName: (format) => `loan-calculator.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

Tests are located in `src/__tests__/` and use:
- Jest as the test runner
- React Testing Library for component testing
- jsdom for DOM simulation

Example test:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import LoanCalculator from '../LoanCalculator';

test('calculates monthly payment correctly', () => {
  render(<LoanCalculator initialLoanAmount={100000} initialInterestRate={5} initialLoanTerm={30} />);

  expect(screen.getByText(/\$536\.82/)).toBeInTheDocument();
});
```

### Adding New Tests

1. Create test files in `src/__tests__/` with `.test.tsx` extension
2. Use React Testing Library for component interactions
3. Follow the Arrange-Act-Assert pattern
4. Test both React component and web component functionality

## Styling

### Tailwind CSS + DaisyUI

The component uses Tailwind CSS with DaisyUI for styling:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Configuration in `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
```

### Theme System

The component supports light/dark themes through DaisyUI:

```tsx
<LoanCalculator theme="dark" />
```

Available themes: `light`, `dark`, or any DaisyUI theme.

## Release Process

### Automated Release Workflow

The project uses GitHub Actions for automated releases:

#### 1. Version Management

```bash
# Update version in package.json
npm version patch|minor|major

# Create and push tag
git push origin v1.0.0
```

#### 2. GitHub Actions Workflows

**CI Workflow** (`.github/workflows/ci.yml`):
- Runs on pull requests and pushes
- Tests on Node.js 18.x and 20.x
- Runs linting, testing, and building

**Release Workflow** (`.github/workflows/release.yml`):
- Triggered on version tags (v*)
- Builds and publishes to npm
- Creates GitHub release

### Manual Release Steps

1. **Prepare Release**
   ```bash
   # Ensure clean working directory
   git status

   # Update version
   npm version patch  # or minor/major
   ```

2. **Test Locally**
   ```bash
   npm test
   npm run build
   npm pack  # Test package creation
   ```

3. **Create Release**
   ```bash
   # Push version commit and tag
   git push origin main
   git push origin --tags
   ```

4. **Verify Release**
   - Check GitHub Actions completion
   - Verify npm package publication
   - Test CDN links work correctly

### Release Checklist

- [ ] All tests pass
- [ ] Build creates valid bundles
- [ ] Version updated in package.json
- [ ] CHANGELOG.md updated
- [ ] Documentation updated
- [ ] Demo site works
- [ ] CDN links functional

## CDN Deployment

### JSDelivr

The component is automatically available via JSDelivr after npm publication:

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/npm/loan-calculator@latest/dist/loan-calculator.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/loan-calculator@latest/dist/loan-calculator.css">

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/npm/loan-calculator@1.0.0/dist/loan-calculator.umd.js"></script>
```

### CDN Cache

JSDelivr cache purging (if needed):
```bash
# Purge latest version
curl -X POST "https://purge.jsdelivr.net/npm/loan-calculator@latest/dist/"

# Purge specific version
curl -X POST "https://purge.jsdelivr.net/npm/loan-calculator@1.0.0/dist/"
```

## Environment Setup

### VS Code Extensions

Recommended extensions:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Jest Runner
- GitLens

### Environment Variables

For GitHub Actions:
- `NPM_TOKEN` - npm registry token for publishing
- `GITHUB_TOKEN` - automatically provided by GitHub

## Troubleshooting

### Common Issues

1. **Build Fails with PostCSS Error**
   ```bash
   npm install @tailwindcss/postcss --save-dev
   ```

2. **Tests Fail with Module Not Found**
   ```bash
   npm install identity-obj-proxy --save-dev
   ```

3. **TypeScript Errors**
   - Check `tsconfig.json` configuration
   - Run `npm run build:types` to generate type definitions

4. **Tailwind Styles Not Applied**
   - Verify `postcss.config.js` uses ES modules
   - Check Tailwind config content paths

### Getting Help

- Check existing [GitHub Issues](https://github.com/yourusername/loan-calculator/issues)
- Review [GitHub Discussions](https://github.com/yourusername/loan-calculator/discussions)
- Read the main [README.md](README.md) documentation
