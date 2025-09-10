export interface LoanCalculatorProps {
  initialLoanAmount?: number;
  initialInterestRate?: number;
  initialLoanTerm?: number;
  theme?: 'light' | 'dark';
  className?: string;
  eventName?: string;
}

export interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  paymentBreakdown: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}
