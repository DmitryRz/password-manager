// AccountCardComponent.js
import {AbstractComponent} from "../../framework/view/abstract-component.js";

const createAccountCard = (account) => {
    const { title, username, category } = account;
    return (`
        <div class="account-card" data-account-id="${account.id}">
            <div class="account-name">${title}</div>
            <div class="account-username">${username}</div>
            <div class="account-category">${category}</div>
        </div>
    `);
};

class AccountCardComponent extends AbstractComponent {
    constructor(account) {
        super();
        this._account = account;
        this._element
    }

    get template() {
        return createAccountCard(this._account);
    }
}

export default AccountCardComponent;