import './index.css';
import './LoanCalculatorElement';

// Export the component for React users
export { default as LoanCalculator } from './LoanCalculator';
export type { LoanCalculatorProps, LoanCalculation } from './LoanCalculator';

// Export the web component
export { default as LoanCalculatorElement } from './LoanCalculatorElement';

// Auto-register the web component when this script is loaded
console.log('Loan Calculator Web Component loaded and registered as <loan-calculator>');

// For UMD builds - attach to window object
declare global {
  interface Window {
    LoanCalculator: typeof import('./LoanCalculator').default;
    LoanCalculatorElement: typeof import('./LoanCalculatorElement').default;
  }
}

if (typeof window !== 'undefined') {
  // Import components dynamically to avoid issues
  import('./LoanCalculator').then((module) => {
    window.LoanCalculator = module.default;
  });

  import('./LoanCalculatorElement').then((module) => {
    window.LoanCalculatorElement = module.default;
  });
}
