import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoanCalculator from '../LoanCalculator';

describe('LoanCalculator', () => {
  beforeEach(() => {
    // Clear any event listeners before each test
    jest.clearAllMocks();
  });

  test('renders loan calculator with default values', () => {
    render(<LoanCalculator />);

    expect(screen.getByDisplayValue('250000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
  });

  test('renders with custom initial values', () => {
    render(
      <LoanCalculator
        initialLoanAmount={500000}
        initialInterestRate={4.5}
        initialLoanTerm={25}
      />
    );

    expect(screen.getByDisplayValue('500000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4.5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('25')).toBeInTheDocument();
  });

  test('updates loan amount when input changes', () => {
    render(<LoanCalculator />);

    const loanAmountInput = screen.getByDisplayValue('250000');
    fireEvent.change(loanAmountInput, { target: { value: '300000' } });

    expect(screen.getByDisplayValue('300000')).toBeInTheDocument();
  });

  test('updates interest rate when input changes', () => {
    render(<LoanCalculator />);

    const interestRateInput = screen.getByDisplayValue('5');
    fireEvent.change(interestRateInput, { target: { value: '6.5' } });

    expect(screen.getByDisplayValue('6.5')).toBeInTheDocument();
  });

  test('updates loan term when input changes', () => {
    render(<LoanCalculator />);

    const loanTermInput = screen.getByDisplayValue('30');
    fireEvent.change(loanTermInput, { target: { value: '15' } });

    expect(screen.getByDisplayValue('15')).toBeInTheDocument();
  });

  test('calculates monthly payment correctly with Thai Baht formatting', async () => {
    render(<LoanCalculator initialLoanAmount={100000} initialInterestRate={5} initialLoanTerm={30} />);

    // For ฿100,000 at 5% for 30 years, monthly payment should be around ฿536.82
    await waitFor(() => {
      expect(screen.getByText(/฿536\.82/)).toBeInTheDocument();
    });
  });

  test('displays results sections when calculation is available', async () => {
    render(<LoanCalculator />);

    await waitFor(() => {
      expect(screen.getByText('Monthly Payment')).toBeInTheDocument();
      expect(screen.getByText('Total Payment')).toBeInTheDocument();
      expect(screen.getByText('Total Interest')).toBeInTheDocument();
    });
  });

  test('applies custom className', () => {
    const { container } = render(<LoanCalculator className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
    expect(container.firstChild).toHaveClass('loan-calculator');
  });

  test('applies theme correctly', () => {
    const { container } = render(<LoanCalculator theme="dark" />);

    expect(container.firstChild).toHaveAttribute('data-theme', 'dark');
    expect(container.firstChild).toHaveClass('dark');
  });

  test('applies light theme by default', () => {
    const { container } = render(<LoanCalculator />);

    expect(container.firstChild).toHaveAttribute('data-theme', 'light');
    expect(container.firstChild).not.toHaveClass('dark');
  });

  test('dispatches custom event when calculation changes', async () => {
    const eventListener = jest.fn();
    window.addEventListener('loan-calculation-event', eventListener);

    render(<LoanCalculator initialLoanAmount={100000} initialInterestRate={5} initialLoanTerm={30} />);

    await waitFor(() => {
      expect(eventListener).toHaveBeenCalled();
    });

    const eventData = eventListener.mock.calls[0][0].detail;
    expect(eventData).toHaveProperty('monthlyPayment');
    expect(eventData).toHaveProperty('totalPayment');
    expect(eventData).toHaveProperty('totalInterest');
    expect(eventData).toHaveProperty('paymentBreakdown');

    window.removeEventListener('loan-calculation-event', eventListener);
  });

  test('dispatches custom event with custom event name', async () => {
    const eventListener = jest.fn();
    const customEventName = 'custom-loan-event';
    window.addEventListener(customEventName, eventListener);

    render(
      <LoanCalculator
        initialLoanAmount={100000}
        initialInterestRate={5}
        initialLoanTerm={30}
        eventName={customEventName}
      />
    );

    await waitFor(() => {
      expect(eventListener).toHaveBeenCalled();
    });

    window.removeEventListener(customEventName, eventListener);
  });

  test('recalculates when inputs change', async () => {
    const eventListener = jest.fn();
    window.addEventListener('loan-calculation-event', eventListener);

    render(<LoanCalculator initialLoanAmount={100000} initialInterestRate={5} initialLoanTerm={30} />);

    // Wait for initial calculation
    await waitFor(() => {
      expect(eventListener).toHaveBeenCalledTimes(1);
    });

    // Change loan amount
    const loanAmountInput = screen.getByDisplayValue('100000');
    fireEvent.change(loanAmountInput, { target: { value: '200000' } });

    // Wait for recalculation
    await waitFor(() => {
      expect(eventListener).toHaveBeenCalledTimes(2);
    });

    window.removeEventListener('loan-calculation-event', eventListener);
  });

  test('handles zero and negative values gracefully', () => {
    render(<LoanCalculator initialLoanAmount={0} initialInterestRate={0} initialLoanTerm={0} />);

    // Check that all three inputs have value 0
    const inputs = screen.getAllByDisplayValue('0');
    expect(inputs).toHaveLength(3); // loan amount, interest rate, and loan term inputs

    // Verify the form renders without crashing
    expect(screen.getByText('Loan Calculator')).toBeInTheDocument();
  });

  test('calculation includes payment breakdown', async () => {
    const eventListener = jest.fn();
    window.addEventListener('loan-calculation-event', eventListener);

    render(<LoanCalculator initialLoanAmount={100000} initialInterestRate={5} initialLoanTerm={1} />);

    await waitFor(() => {
      expect(eventListener).toHaveBeenCalled();
    });

    const eventData = eventListener.mock.calls[0][0].detail;
    expect(eventData.paymentBreakdown).toHaveLength(12); // 1 year = 12 months
    expect(eventData.paymentBreakdown[0]).toHaveProperty('month', 1);
    expect(eventData.paymentBreakdown[0]).toHaveProperty('payment');
    expect(eventData.paymentBreakdown[0]).toHaveProperty('principal');
    expect(eventData.paymentBreakdown[0]).toHaveProperty('interest');
    expect(eventData.paymentBreakdown[0]).toHaveProperty('balance');

    window.removeEventListener('loan-calculation-event', eventListener);
  });

  test('formats currency in Thai Baht', async () => {
    render(<LoanCalculator initialLoanAmount={1000000} initialInterestRate={5} initialLoanTerm={30} />);

    await waitFor(() => {
      // Should display Thai Baht currency format - check for at least one element with ฿ symbol
      const bahtElements = screen.getAllByText(/฿/);
      expect(bahtElements.length).toBeGreaterThan(0);

      // Specifically check for the monthly payment format
      expect(screen.getByText(/฿5,368\.22/)).toBeInTheDocument();
    });
  });
});
