import { useState, useEffect } from 'react';

export interface LoanCalculatorProps {
  initialLoanAmount?: number;
  initialInterestRate?: number;
  initialLoanTerm?: number;
  theme?: 'light' | 'dark';
  className?: string;
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

const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  initialLoanAmount = 250000,
  initialInterestRate = 5.0,
  initialLoanTerm = 30,
  theme = 'light',
  className = ''
}) => {
  const [loanAmount, setLoanAmount] = useState(initialLoanAmount);
  const [interestRate, setInterestRate] = useState(initialInterestRate);
  const [loanTerm, setLoanTerm] = useState(initialLoanTerm);
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

  useEffect(() => {
    const calculateLoan = (): LoanCalculation => {
      const principal = loanAmount;
      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;

      // Calculate monthly payment using the formula
      const monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;

      // Calculate payment breakdown
      const paymentBreakdown = [];
      let balance = principal;

      for (let month = 1; month <= numberOfPayments; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        paymentBreakdown.push({
          month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance)
        });
      }

      return {
        monthlyPayment,
        totalPayment,
        totalInterest,
        paymentBreakdown
      };
    };

    if (loanAmount > 0 && interestRate >= 0 && loanTerm > 0) {
      setCalculation(calculateLoan());
    }
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const themeClass = theme === 'dark' ? 'dark' : '';

  return (
    <div className={`loan-calculator ${themeClass} ${className}`} data-theme={theme}>
      <div className="card w-full max-w-4xl mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Loan Calculator</h2>

          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Loan Amount</span>
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="input input-bordered w-full"
                min="0"
                step="1000"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Interest Rate (%)</span>
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="input input-bordered w-full"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Loan Term (years)</span>
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="input input-bordered w-full"
                min="1"
                max="50"
              />
            </div>
          </div>

          {/* Results Section */}
          {calculation && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="stat bg-primary text-primary-content rounded-lg">
                <div className="stat-title text-primary-content/70">Monthly Payment</div>
                <div className="stat-value text-lg">
                  {formatCurrency(calculation.monthlyPayment)}
                </div>
              </div>

              <div className="stat bg-secondary text-secondary-content rounded-lg">
                <div className="stat-title text-secondary-content/70">Total Payment</div>
                <div className="stat-value text-lg">
                  {formatCurrency(calculation.totalPayment)}
                </div>
              </div>

              <div className="stat bg-accent text-accent-content rounded-lg">
                <div className="stat-title text-accent-content/70">Total Interest</div>
                <div className="stat-value text-lg">
                  {formatCurrency(calculation.totalInterest)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
