#pragma once
#include "LoanInput.hpp"
#include <string>

inline bool validateInput(const LoanInput& in, std::string& err) {
    if (in.price <= 0) { err = "차량 가격은 0보다 커야 합니다."; return false; }
    if (in.downPayment < 0) { err = "선납금은 0 이상."; return false; }
    if (in.downPayment >= in.price) { err = "선납금은 차량 가격보다 작아야 합니다."; return false; }
    if (in.months <= 0) { err = "개월 수는 1 이상이어야 함."; return false; }
    return true;
}