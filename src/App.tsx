import LoanCalculator from './LoanCalculator';
import './LoanCalculatorElement'; // Register web component

function App() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8">Loan Calculator Demo</h1>

        {/* React Component Demo */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">React Component Usage</h2>
          <LoanCalculator
            initialLoanAmount={300000}
            initialInterestRate={4.5}
            initialLoanTerm={25}
            theme="light"
            className="mb-6"
          />
        </div>

        {/* Web Component Demo */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Web Component Usage (HTML)</h2>
          <div className="mockup-code mb-4">
            <pre data-prefix="$">
              <code>{`<loan-calculator
  loan-amount="200000"
  interest-rate="5.5"
  loan-term="30"
  theme="dark">
</loan-calculator>`}</code>
            </pre>
          </div>

          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: `<loan-calculator
                  loan-amount="200000"
                  interest-rate="5.5"
                  loan-term="30"
                  theme="dark">
                </loan-calculator>`
              }}
            />
          </div>
        </div>

        {/* CDN Usage Instructions */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">CDN Usage Instructions</h2>
            <p className="mb-4">To use this component via CDN, add the following script tag to your HTML:</p>

            <div className="mockup-code">
              <pre data-prefix="1">
                <code>{`<!DOCTYPE html>`}</code>
              </pre>
              <pre data-prefix="2">
                <code>{`<html lang="en">`}</code>
              </pre>
              <pre data-prefix="3">
                <code>{`<head>`}</code>
              </pre>
              <pre data-prefix="4">
                <code>{`  <script src="https://cdn.jsdelivr.net/npm/loan-calculator@latest/dist/loan-calculator.umd.js"></script>`}</code>
              </pre>
              <pre data-prefix="5">
                <code>{`  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/loan-calculator@latest/dist/style.css">`}</code>
              </pre>
              <pre data-prefix="6">
                <code>{`</head>`}</code>
              </pre>
              <pre data-prefix="7">
                <code>{`  <loan-calculator loan-amount="250000" interest-rate="4.0" loan-term="30"></loan-calculator>`}</code>
              </pre>
              <pre data-prefix="8">
                <code>{`</body>`}</code>
              </pre>
              <pre data-prefix="9">
                <code>{`</html>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
