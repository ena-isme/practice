#include "LoanProduct.hpp"

using namespace std;

class StandardLoan : public LoanProduct {
    double annualRate_;
public:
    //annualRate_는 계산할 때 공식에 넣음, 뒤에 _는 “멤버 변수”라는 표시
    explicit StandardLoan(double r) : annualRate_(r) {}

    string name() const override { return "Standard Loan"; }

    LoanQuote calculate(const LoanInput& input) const override {
        LoanQuote q;
        q.productName = name();

        double principal = input.price - input.downPayment;
        q.monthlyPayment = monthlyPayment(principal, input.months, annualRate_);
        q.totalPayment   = q.monthlyPayment * input.months;
        q.totalInterest  = q.totalPayment - principal;

        return q;
    }
};