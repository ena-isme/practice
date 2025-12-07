#include "LoanProduct.hpp"

class BalloonLoan : public LoanProduct {
    double annualRate_;
    double residualRate_;
public:
    BalloonLoan(double rate, double residual)
        : annualRate_(rate), residualRate_(residual) {}

    std::string name() const override { return "Balloon Loan"; }

    LoanQuote calculate(const LoanInput& input) const override {
        LoanQuote q;
        q.productName = name();

        double residual = input.price * residualRate_;
        double principal = input.price - input.downPayment - residual;

        if (principal <= 0) {
            q.available = false;
            q.reason = "잔가·선납금 제외 원금이 0 이하";
            return q;
        }

        q.monthlyPayment = monthlyPayment(principal, input.months, annualRate_);
        q.totalPayment = q.monthlyPayment * input.months + residual;
        q.totalInterest = q.totalPayment - (input.price - input.downPayment);

        return q;
    }
};