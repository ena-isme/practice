#include <iostream>
#include <iomanip>
#include "LoanCalculator.hpp"
#include "utils.hpp"

int main() {
    LoanInput input{};
    std::string error;

    std::cout << "차량 가격: ";
    std::cin >> input.price;

    std::cout << "선납금: ";
    std::cin >> input.downPayment;

    std::cout << "대출 기간(개월): ";
    std::cin >> input.months;

    if (!validateInput(input, error)) {
        std::cerr << "[오류] " << error << "\n";
        return 1;
    }

    LoanCalculator calc;
    auto results = calc.calculateAll(input);

    std::cout << "\n=== 결과 ===\n";
    std::cout << std::fixed << std::setprecision(0);

    for (auto& r : results) {
        std::cout << "[" << r.productName << "]\n";
        if (!r.available) {
            std::cout << "  이용불가: " << r.reason << "\n\n";
            continue;
        }

        std::cout << "  월 납입금: " << r.monthlyPayment << "\n";
        std::cout << "  총 상환액: " << r.totalPayment << "\n";
        std::cout << "  총 이자액: " << r.totalInterest << "\n\n";
    }
}