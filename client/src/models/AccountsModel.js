import Observable from '../framework/observable.js';

export default class AccountsModel extends Observable {
    #accountsApiService = null;
    #accounts = [];
    
    constructor(accountsApiService) {
        super();
        this.#accountsApiService = accountsApiService;
    }

    get accounts() {
        return this.#accounts;
    }

    async init() {
        try {
            this.#accounts = await this.#accountsApiService.getAccounts();
        } catch(err) {
            this.#accounts = [];
        }
        
        this._notify('INIT');
    }

    async addAccount(account) {
        try {
            const newAccount = await this.#accountsApiService.addAccount(account);
            this.#accounts.push(newAccount);
            this._notify('UPDATE');
        } catch(err) {
            throw new Error('Can\'t add account');
        }
    }

    async updateAccount(account) {
        try {
            const updatedAccount = await this.#accountsApiService.updateAccount(account);
            const index = this.#accounts.findIndex((acc) => acc.id === updatedAccount.id);
            
            if (index !== -1) {
                this.#accounts[index] = updatedAccount;
                this._notify('UPDATE');
            }
        } catch(err) {
            throw new Error('Can\'t update account');
        }
    }

    async deleteAccount(account) {
        try {
            await this.#accountsApiService.deleteAccount(account);
            this.#accounts = this.#accounts.filter((acc) => acc.id !== account.id);
            this._notify('UPDATE');
        } catch(err) {
            throw new Error('Can\'t delete account');
        }
    }
}