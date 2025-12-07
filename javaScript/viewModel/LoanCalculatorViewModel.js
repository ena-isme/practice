// viewModel/LoanCalculatorViewModel.js

export class LoanCalculatorViewModel {
  constructor(model, rateService) {
    this.model = model;
    this.rateService = rateService;

    this.product = "standard";
    this.rateSourceLabel = null;
    this.loading = false;
    this.errorMessage = null;

    this.subscribers = [];
  }

  subscribe(cb) {
    this.subscribers.push(cb);
  }

  notify() {
    this.subscribers.forEach((cb) => cb(this));
  }

  // Setters
  setPrice(v) { this.model.price = Number(v) || 0; this.notify(); }
  setDown(v) { this.model.down = Number(v) || 0; this.notify(); }
  setMonths(v) { this.model.months = Number(v) || 0; this.notify(); }
  setRate(v) { this.model.rate = Number(v) || 0; this.notify(); }
  setProduct(v) { this.product = v; this.notify(); }

  // API 연동
  async loadRate() {
    this.loading = true;
    this.errorMessage = null;
    this.notify();

    try {
      const data = await this.rateService.fetchRate(this.product);
      this.model.rate = data.rate;
      this.rateSourceLabel = data.label;
    } catch (err) {
      this.errorMessage = "금리 정보를 가져오지 못했습니다.";
    } finally {
      this.loading = false;
      this.notify();
    }
  }

  // Getters (View에서 사용)
  get price() { return this.model.price; }
  get down() { return this.model.down; }
  get months() { return this.model.months; }
  get rate() { return this.model.rate; }
  get loanPrincipal() { return this.model.loanPrincipal; }
  get monthlyPayment() { return this.model.monthlyPayment; }
  get isValid() { return this.model.isValid; }

  get validationErrors() {
    const e = {};
    if (this.model.price <= 0) e.carPrice = "차량 가격을 올바르게 입력해주세요.";
    if (this.model.down < 0) e.downPayment = "선납금은 0원 이상이어야 합니다.";
    else if (this.model.down >= this.model.price) e.downPayment = "선납금이 차량 가격보다 큽니다.";
    if (this.model.months <= 0) e.periodMonths = "기간은 1개월 이상입니다.";
    if (this.model.rate < 0) e.interestRate = "금리는 0 이상이어야 합니다.";
    return e;
  }
}