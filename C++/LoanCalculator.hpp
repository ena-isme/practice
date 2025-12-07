#pragma once

#include <memory>
#include <vector>
#include "LoanProduct.hpp"

class LoanCalculator {
public:
    LoanCalculator();
    std::vector<LoanQuote> calculateAll(const LoanInput& input) const;

private:
    std::vector<std::unique_ptr<LoanProduct>> products_;
};