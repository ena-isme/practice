#include "LoanCalculator.hpp"
#include "LoanProduct.hpp"

// 실제 클래스 선언 파일 포함
#include "StandardLoan.cpp"
#include "PreferredLoan.cpp"
#include "BalloonLoan.cpp"

LoanCalculator::LoanCalculator() {
    products_.push_back(std::make_unique<StandardLoan>(5.0));
    products_.push_back(std::make_unique<PreferredLoan>(3.5, 36));
    products_.push_back(std::make_unique<BalloonLoan>(4.2, 0.30));
}

std::vector<LoanQuote> LoanCalculator::calculateAll(const LoanInput& input) const {
    std::vector<LoanQuote> result;
    for (const auto& p : products_) {
        result.push_back(p->calculate(input));
    }
    return result;
}