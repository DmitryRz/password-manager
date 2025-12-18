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
        this._callback = {};
    }

    get template() {
        return createAccountCardTemplate(this._account);
    }

    setClickHandler(callback) {
        this._callback.click = callback;
        this.element.addEventListener('click', this.#clickHandler);
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this._callback.click?.();
    };
}

export default AccountCardComponent;