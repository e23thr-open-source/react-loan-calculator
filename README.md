# Loan Calculator Web Component

A modern, responsive loan calculator built with React 19, TypeScript, and Tailwind CSS. Available as both a React component and a standalone web component for easy integration into any web application.

![Version](https://img.shields.io/npm/v/@e23thr-dev/loan-calculator)
![License](https://img.shields.io/npm/l/@e23thr-dev/loan-calculator)
![Build Status](https://img.shields.io/github/workflow/status/e23thr-open-source/react-loan-calculator/CI)

## Features

- 🔧 **Easy Integration**: Use as React component or web component
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Themeable**: Light/dark themes with DaisyUI
- 💰 **Accurate Calculations**: Precise loan payment calculations
- ⚡ **Fast**: Built with Vite for optimal performance
- 🔄 **Real-time Updates**: Live calculation updates as you type
- 📊 **Detailed Results**: Monthly payment, total payment, and interest breakdown
- ♿ **Accessible**: Screen reader friendly and keyboard navigable

## Demo

View the live demo: [https://e23thr-open-source.github.io/react-loan-calculator](https://e23thr-open-source.github.io/react-loan-calculator)

## Installation

### Via npm

```bash
npm install @e23thr-dev/loan-calculator
```

### Via CDN

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@e23thr-dev/loan-calculator@latest/dist/loan-calculator.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/@e23thr-dev/loan-calculator@latest/dist/loan-calculator.umd.js"></script>
```

## Usage

### As a React Component

```tsx
import React from 'react';
import { LoanCalculator } from '@e23thr-dev/loan-calculator';
import '@e23thr-dev/loan-calculator/dist/loan-calculator.css';

function App() {
  return (
    <div>
      <LoanCalculator
        initialLoanAmount={250000}
        initialInterestRate={5.0}
        initialLoanTerm={30}
        theme="light"
      />
    </div>
  );
}
```

### As a Web Component (HTML)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loan Calculator</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@e23thr-dev/loan-calculator@latest/dist/loan-calculator.css">
</head>
<body>
  <!-- Web Component -->
  <loan-calculator
    loan-amount="300000"
    interest-rate="4.5"
    loan-term="25"
    theme="dark">
  </loan-calculator>

  <script src="https://cdn.jsdelivr.net/npm/@e23thr-dev/loan-calculator@latest/dist/loan-calculator.umd.js"></script>
</body>
</html>
```

## API Reference

### React Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialLoanAmount` | `number` | `250000` | Initial loan amount in dollars |
| `initialInterestRate` | `number` | `5.0` | Initial annual interest rate as percentage |
| `initialLoanTerm` | `number` | `30` | Initial loan term in years |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme for the calculator |
| `className` | `string` | `''` | Additional CSS classes |
| `eventName` | `string` | `loan-calculation-event"` | Event name for custom events |


### Web Component Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `loan-amount` | `string` | `"250000"` | Initial loan amount |
| `interest-rate` | `string` | `"5.0"` | Initial interest rate |
| `loan-term` | `string` | `"30"` | Initial loan term in years |
| `theme` | `string` | `"light"` | Theme (light/dark) |
| `class` | `string` | `""` | Additional CSS classes |
| `event-name` | `string` | `loan-calculation-event"` | Event name for custom events |

### Calculation Results

The component provides the following calculated values:

- **Monthly Payment**: Principal and interest payment per month
- **Total Payment**: Total amount paid over the life of the loan
- **Total Interest**: Total interest paid over the life of the loan

## Styling

The component uses Tailwind CSS with DaisyUI for styling. You can customize the appearance by:

1. **Theme**: Use the `theme` prop to switch between light and dark themes
2. **CSS Classes**: Add custom classes via the `className` prop
3. **CSS Variables**: Override DaisyUI CSS variables for custom colors
4. **Tailwind**: If using Tailwind in your project, you can extend the styles

### Custom Theme Example

```css
[data-theme="custom"] {
  --p: 220 13% 91%;
  --pc: 220 13% 9%;
  --s: 158 64% 52%;
  --sc: 0 0% 100%;
  --a: 43 96% 56%;
  --ac: 0 0% 100%;
}
```

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- React 16.8+ (for React component usage)

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md) for development setup and contribution guidelines.

### Automated Changelog

This project uses automated changelog generation based on [Conventional Commits](https://conventionalcommits.org/).

**Quick start:**
```bash
npm run changelog:demo  # Interactive demo
npm run changelog:update  # Manual update
```

**Commit format:**
```bash
feat: add new feature
fix: resolve bug issue
docs: update documentation
```

**Version workflow:**
```bash
npm version patch  # Auto-updates changelog
git push origin main --tags  # Triggers release
```

See [docs/CHANGELOG_AUTOMATION.md](docs/CHANGELOG_AUTOMATION.md) for full details.

## License

MIT © [Your Name](https://github.com/yourusername)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and automated release notes.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [conventional commits](https://conventionalcommits.org/) (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Note:** Please use conventional commit messages to ensure proper changelog generation.

## Support
- 📖 [Documentation](https://e23thr-open-source.github.io/react-loan-calculator)
- 🐛 [Issue Tracker](https://github.com/e23thr-open-source/react-loan-calculator/issues)
- 💬 [Discussions](https://github.com/e23thr-open-source/react-loan-calculator/discussions)
