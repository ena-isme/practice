// model/HttpRateService.js

import { AbstractRateService } from "../abstract/AbstractRateService.js";

export class HttpRateService extends AbstractRateService {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl;
  }

  async fetchRate(product) {
    const url = `${this.baseUrl}/rates?product=${encodeURIComponent(product)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Rate API Failed: ${response.status}`);
    }
    return response.json();
  }
}

/* 예시
// HttpLoanService.js
import { ILoanService } from "./ILoanService.js";
import { HttpClient } from "../core/HttpClient.js";

export class HttpLoanService extends ILoanService {
  constructor(baseUrl) {
    super();
    this.http = new HttpClient(baseUrl);
  }

  getRate(product) {
    return this.http.get(`/loan/rate?product=${encodeURIComponent(product)}`);
  }

  applyLoan(payload) {
    return this.http.post("/loan/apply", payload);
  }

  updateLoan(applicationId, payload) {
    return this.http.put(`/loan/${applicationId}`, payload);
  }

  cancelLoan(applicationId) {
    return this.http.delete(`/loan/${applicationId}`);
  }

  checkStatus(applicationId) {
    return this.http.get(`/loan/status/${applicationId}`);
  }
}

*/