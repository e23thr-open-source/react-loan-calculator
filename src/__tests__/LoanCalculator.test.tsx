import { render, screen, fireEvent } from '@testing-library/react';
import LoanCalculator from '../LoanCalculator';

describe('LoanCalculator', () => {
  test('renders loan calculator with default values', () => {
    render(<LoanCalculator />);

    expect(screen.getByDisplayValue('250000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
  });

  test('updates loan amount when input changes', () => {
    render(<LoanCalculator />);

    const loanAmountInput = screen.getByDisplayValue('250000');
    fireEvent.change(loanAmountInput, { target: { value: '300000' } });

    expect(screen.getByDisplayValue('300000')).toBeInTheDocument();
  });

  test('calculates monthly payment correctly', () => {
    render(<LoanCalculator initialLoanAmount={100000} initialInterestRate={5} initialLoanTerm={30} />);

    // For $100,000 at 5% for 30 years, monthly payment should be around $536.82
    expect(screen.getByText(/\$536\.82/)).toBeInTheDocument();
  });

  test('displays results sections when calculation is available', () => {
    render(<LoanCalculator />);

    expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
    expect(screen.getByText('Total Payment')).toBeInTheDocument();
    expect(screen.getByText('Total Interest')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(<LoanCalculator className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('applies theme correctly', () => {
    const { container } = render(<LoanCalculator theme="dark" />);

    expect(container.firstChild).toHaveAttribute('data-theme', 'dark');
  });
});
