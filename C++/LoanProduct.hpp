#pragma once
#include <string>
#include "LoanInput.hpp"
#include "LoanQuote.hpp"
#include <cmath>

using namespace std;

class LoanProduct {
public:
    virtual ~LoanProduct() = default;
    virtual string name() const = 0;
    virtual LoanQuote calculate(const LoanInput& input) const = 0;

protected:
    static double monthlyPayment(double principal, int months, double annualRate) {
        if (principal <= 0 || months <= 0) return 0;

        double r = annualRate / 100.0 / 12.0;
        if (r == 0) return principal / months;

        return (r * principal) / (1 - pow(1 + r, -months));
    }
};