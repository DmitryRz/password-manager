// client/src/api/accounts-api-service.js
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class AccountsApiService {
  #endPoint = '';
  #authorization = '';

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  getAccounts() {
    return this.#load({ url: 'account' })
      .then(AccountsApiService.parseResponse);
  }

  async addAccount(account) {
    const response = await this.#load({
      url: 'account',
      method: Method.POST,
      body: JSON.stringify(account),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await AccountsApiService.parseResponse(response);
  }

  async updateAccount(account) {
    const response = await this.#load({
      url: `account/${account.id}`,
      method: Method.PUT,
      body: JSON.stringify(account),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return await AccountsApiService.parseResponse(response);
  }

  async deleteAccount(account) {
    return await this.#load({
      url: `account/${account.id}`,
      method: Method.DELETE,
    });
  }

  async #load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      { method, body, headers },
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }

  static parseResponse(response) {
    return response.json();
  }
}

