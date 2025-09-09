import { createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import LoanCalculator, { type LoanCalculatorProps } from './LoanCalculator';

class LoanCalculatorElement extends HTMLElement {
  private root: Root | null = null;

  static get observedAttributes() {
    return [
      'loan-amount',
      'interest-rate',
      'loan-term',
      'theme',
      'class'
    ];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  private getProps(): LoanCalculatorProps {
    return {
      initialLoanAmount: this.getAttribute('loan-amount')
        ? Number(this.getAttribute('loan-amount'))
        : undefined,
      initialInterestRate: this.getAttribute('interest-rate')
        ? Number(this.getAttribute('interest-rate'))
        : undefined,
      initialLoanTerm: this.getAttribute('loan-term')
        ? Number(this.getAttribute('loan-term'))
        : undefined,
      theme: (this.getAttribute('theme') as 'light' | 'dark') || 'light',
      className: this.getAttribute('class') || ''
    };
  }

  private render() {
    if (!this.root) {
      this.root = createRoot(this);
    }

    this.root.render(createElement(LoanCalculator, this.getProps()));
  }
}

// Register the custom element
if (!customElements.get('loan-calculator')) {
  customElements.define('loan-calculator', LoanCalculatorElement);
}

export default LoanCalculatorElement;
