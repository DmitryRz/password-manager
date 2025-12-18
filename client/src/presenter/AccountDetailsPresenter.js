import { render, remove } from '../framework/render.js';
import AccountDetailsPage from '../pages/AccountDetailsPage.js';
import AccountDetailsDisplayComponent from '../components/AccountDetailsDisplayComponent.js';

class AccountDetailsPresenter {
    #container = null;
    #account = null;
    #onBack = null;
    #accountsModel = null;
    #onNavigate = null;

    #accountDetailsPageComponent = null;
    #accountDetailsDisplayComponent = null;

    constructor({ container, account, onBack, accountsModel, onNavigate }) {
        this.#container = container;
        this.#account = account;
        this.#onBack = onBack;
        this.#accountsModel = accountsModel;
        this.#onNavigate = onNavigate;
    }

    init() {
        this.#accountDetailsPageComponent = new AccountDetailsPage();
        this.#accountDetailsDisplayComponent = new AccountDetailsDisplayComponent(this.#account);
        
        render(this.#accountDetailsPageComponent, this.#container);
        render(this.#accountDetailsDisplayComponent, this.#accountDetailsPageComponent.detailsContainer);

        this.#accountDetailsDisplayComponent.setBackToAccountsHandler(() => {
            this.#onBack?.();
        });

        this.#accountDetailsDisplayComponent.setDeleteHandler(async () => {
            await this.#accountsModel.deleteAccount(this.#account);
            this.#onBack?.();
        });

        this.#accountDetailsDisplayComponent.setEditHandler(() => {
            this.#onNavigate('add-account', this.#account);
        });
    }

    destroy() {
        remove(this.#accountDetailsDisplayComponent);
        remove(this.#accountDetailsPageComponent);
    }
}

export default AccountDetailsPresenter;
