import './index.css';
import LoanCalculatorElement from './LoanCalculatorElement';
import LoanCalculator from './LoanCalculator';

// Export the component for React users
export { default as LoanCalculator } from './LoanCalculator';
export type { LoanCalculatorProps, LoanCalculation } from './types';

// Export the web component
export { default as LoanCalculatorElement } from './LoanCalculatorElement';

// Auto-register the web component when this script is loaded
console.log('Loan Calculator Web Component loaded and registered as <loan-calculator>');

// For UMD builds - attach to window object
declare global {
  interface Window {
    LoanCalculator: typeof LoanCalculator;
    LoanCalculatorElement: typeof LoanCalculatorElement;
  }
}

if (typeof window !== 'undefined') {
  // Attach components to window for UMD builds
  window.LoanCalculator = LoanCalculator;
  window.LoanCalculatorElement = LoanCalculatorElement;
}
