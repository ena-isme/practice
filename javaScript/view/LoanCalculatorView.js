// view/LoanCalculatorView.js

function won(v) {
  if (v == null) return "-";
  return v.toLocaleString("ko-KR") + "원";
}

import { LoanCalculatorModel } from "../model/LoanCalculatorModel.js";
import { HttpRateService } from "../model/HttpRateService.js";
import { LoanCalculatorViewModel } from "../viewModel/LoanCalculatorViewModel.js";

export class LoanCalculatorView {
  constructor() {
    const model = new LoanCalculatorModel(30000000, 5000000, 36, 5.0);
    const rateService = new HttpRateService("https://api.example.com");
    this.vm = new LoanCalculatorViewModel(model, rateService);

    this.cacheDOM();
    this.bindEvents();
    this.vm.subscribe((vm) => this.render(vm));
    this.render(this.vm);
  }

  cacheDOM() {
    this.price = document.getElementById("carPrice");
    this.down = document.getElementById("downPayment");
    this.months = document.getElementById("periodMonths");
    this.rate = document.getElementById("interestRate");

    this.product = document.getElementById("productSelect");
    this.btnFetch = document.getElementById("fetchRateBtn");
    this.status = document.getElementById("rateFetchStatus");

    this.monthly = document.getElementById("monthlyPayment");
    this.principal = document.getElementById("loanPrincipal");
    this.periodLabel = document.getElementById("periodLabel");
    this.rateLabel = document.getElementById("interestLabel");

    this.errorEls = {
      carPrice: document.querySelector('[data-error-for="carPrice"]'),
      downPayment: document.querySelector('[data-error-for="downPayment"]'),
      periodMonths: document.querySelector('[data-error-for="periodMonths"]'),
      interestRate: document.querySelector('[data-error-for="interestRate"]'),
    };
  }

  bindEvents() {
    this.price.addEventListener("input", (e) => this.vm.setPrice(e.target.value));
    this.down.addEventListener("input", (e) => this.vm.setDown(e.target.value));
    this.months.addEventListener("input", (e) => this.vm.setMonths(e.target.value));
    this.rate.addEventListener("input", (e) => this.vm.setRate(e.target.value));
    this.product.addEventListener("change", (e) => this.vm.setProduct(e.target.value));

    this.btnFetch.addEventListener("click", () => this.vm.loadRate());
  }

  render(vm) {
    this.price.value = vm.price;
    this.down.value = vm.down;
    this.months.value = vm.months;
    this.rate.value = vm.rate;

    this.product.value = vm.product;

    // 에러 표시
    const errs = vm.validationErrors;
    Object.keys(this.errorEls).forEach((k) => {
      this.errorEls[k].textContent = errs[k] || "";
    });

    // 계산 결과
    if (!vm.isValid || vm.monthlyPayment == null) {
      this.monthly.textContent = "-";
      this.principal.textContent = "-";
      this.periodLabel.textContent = "-";
      this.rateLabel.textContent = "-";
    } else {
      this.monthly.textContent = won(vm.monthlyPayment);
      this.principal.textContent = won(vm.loanPrincipal);
      this.periodLabel.textContent = vm.months + "개월";
      this.rateLabel.textContent = vm.rate + "%";
    }

    // API 상태
    if (vm.loading) {
      this.status.textContent = "금리 불러오는 중…";
      this.status.style.color = "#555";
    } else if (vm.errorMessage) {
      this.status.textContent = vm.errorMessage;
      this.status.style.color = "#d33";
    } else if (vm.rateSourceLabel) {
      this.status.textContent = `[${vm.rateSourceLabel}] 금리 적용됨`;
      this.status.style.color = "#16a34a";
    } else {
      this.status.textContent = "";
    }
  }
}

// 페이지 로드 시 자동 초기화
document.addEventListener("DOMContentLoaded", () => new LoanCalculatorView());