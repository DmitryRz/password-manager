// /components/AccountCardComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const createAccountCardTemplate = (account) => {
    const { id, name, username, category } = account;

    return (`
        <div class="account-card" data-account-id="${id}">
            <div class="account-name">${name}</div>
            <div class="account-username">${username}</div>
            <div class="account-category">${category}</div>
        </div>
    `);
};



class AccountCardComponent extends AbstractComponent {
    constructor(account) {
        super();
        this._account = account;
    }

    get template() {
        return createAccountCardTemplate(this._account);
    }
}

export default AccountCardComponent;