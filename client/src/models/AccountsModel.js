import { accounts } from "../mock/account.js";

class AccountsModel {
    #accounts = accounts;

    set accounts(accounts) {
        this.#accounts = [...accounts];
    }

    get accounts() {
        return this.#accounts;
    }
}

export default AccountsModel;