import { render, remove } from '../framework/render.js';
import AddAccountPage from '../pages/AddAccountPage.js';
import AccountFormComponent from '../components/AccountFormComponent.js';

class AddAccountPresenter {
    #container = null;
    #accountsModel = null;
    #addAccountPageComponent = null;
    #accountFormComponent = null;
    #onFinish = null;
    #accountData = null;

    constructor({ container, accountsModel, onFinish, accountData = null }) {
        this.#container = container;
        this.#accountsModel = accountsModel;
        this.#onFinish = onFinish;
        this.#accountData = accountData;
    }

    init() {
        const isEditMode = !!this.#accountData;
        const pageTitle = isEditMode ? 'Редактировать аккаунт' : 'Добавить аккаунт';

        this.#addAccountPageComponent = new AddAccountPage(pageTitle);
        this.#accountFormComponent = new AccountFormComponent(this.#accountData);

        render(this.#addAccountPageComponent, this.#container);
        render(this.#accountFormComponent, this.#addAccountPageComponent.formContainer);
        
        this.#accountFormComponent.setCancelClickHandler(() => {
            this.#onFinish?.();
        });

        this.#accountFormComponent.setSaveHandler(async (account) => {
            if (isEditMode) {
                await this.#accountsModel.updateAccount(account);
            } else {
                await this.#accountsModel.addAccount(account);
            }
            this.#onFinish?.();
        });
    }

    destroy() {
        remove(this.#accountFormComponent);
        remove(this.#addAccountPageComponent);
    }
}

export default AddAccountPresenter;
