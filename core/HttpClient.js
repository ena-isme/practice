export class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(method, url, body) {
    const options = {
      method,
      headers: { "Content-Type": "application/json" }
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(this.baseUrl + url, options);

    if (!res.ok) {
      throw new Error(`${method} ${url} 실패: ${res.status}`);
    }
    return res.json();
  }

  get(url) { return this.request("GET", url); }
  post(url, body) { return this.request("POST", url, body); }
  put(url, body) { return this.request("PUT", url, body); }
  patch(url, body) { return this.request("PATCH", url, body); }
  delete(url) { return this.request("DELETE", url); }
}