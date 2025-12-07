// model/AbstractRateService.js

export class AbstractRateService {
  async fetchRate(product) {
    throw new Error("subclss 를 형성해야 합니다");
  }

  /*
  async applyLoan(payload) {
    // payload: { product, amount, periodMonths, customerId, ... }
    throw new Error("applyLoan(payload) must be implemented");
  }

  // 대출 진행 상태 조회
  async checkStatus(applicationId) {
    throw new Error("checkStatus(applicationId) must be implemented");
  }
    */
}