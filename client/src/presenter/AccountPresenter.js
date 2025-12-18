import { render, RenderPosition } from "../framework/render.js";
import AccountCardComponent from "../components/AccountCardComponent.js";
import PasswordGeneratorComponent from "../components/PasswordGeneratorComponent.js";
import SearchFilterComponent from "../components/SearchFilterComponent.js";
import MainPage from "../pages/MainPage.js";

class AccountPresenter {
    #container = null;
    #accountsModel = null;
    
    #mainPageComponent = new MainPage();
    #passwordGeneratorComponent = new PasswordGeneratorComponent();
    #searchFilterComponent = new SearchFilterComponent();

    constructor({container, accountsModel}) {
        this.#container = container;
        this.#accountsModel = accountsModel;
    }

    init() {
        render(this.#mainPageComponent, this.#container, RenderPosition.BEFOREEND);

        render(this.#passwordGeneratorComponent, this.#mainPageComponent.generatorContainer);
        render(this.#searchFilterComponent, this.#mainPageComponent.filterContainer);

        this.#renderAccountList();
    }

    #renderAccountList() {
        const accounts = this.#accountsModel.accounts;
        const accountsContainer = this.#mainPageComponent.accountsContainer;

        accounts.forEach((account) => {
            this.#renderAccount(account, accountsContainer);
        });
    }

    #renderAccount(account, container) {
        const accountCard = new AccountCardComponent(account);
        render(accountCard, container);
    }
}

export default AccountPresenter;
