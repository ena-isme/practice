#include "LoanProduct.hpp"

class PreferredLoan : public LoanProduct {
    double annualRate_;
    int maxMonths_;
public:
    PreferredLoan(double rate, int maxMonths)
        : annualRate_(rate), maxMonths_(maxMonths) {}

    std::string name() const override { return "Preferred Loan"; }

    LoanQuote calculate(const LoanInput& input) const override {
        LoanQuote q;
        q.productName = name();

        if (input.months > maxMonths_) {
            q.available = false;
            q.reason = "최대 " + std::to_string(maxMonths_) + "개월까지 이용 가능";
            return q;
        }

        double principal = input.price - input.downPayment;
        q.monthlyPayment = monthlyPayment(principal, input.months, annualRate_);
        q.totalPayment = q.monthlyPayment * input.months;
        q.totalInterest = q.totalPayment - principal;

        return q;
    }
};