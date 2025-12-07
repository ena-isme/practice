#pragma once
#include <string>

using namespace std;

struct LoanQuote {
    string productName;
    double monthlyPayment = 0;
    double totalPayment = 0;
    double totalInterest = 0;
    bool available = true;
    string reason;
};