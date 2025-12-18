import { render, RenderPosition, remove } from '../framework/render.js';
import AccountCardComponent from '../components/AccountCardComponent.js';
import PasswordGeneratorComponent from '../components/PasswordGeneratorComponent.js';
import SearchFilterComponent from '../components/SearchFilterComponent.js';
import MainPage from '../pages/MainPage.js';

class AccountPresenter {
    #container = null;
    #accountsModel = null;
    #onAccountSelect = null;
    #onAddAccount = null;

    #mainPageComponent = new MainPage();
    #passwordGeneratorComponent = new PasswordGeneratorComponent();
    #searchFilterComponent = new SearchFilterComponent();
    #accountCardComponents = new Map();
    #currentFilter = { searchTerm: '', category: '' };

    constructor({container, accountsModel, onAccountSelect, onAddAccount}) {
        this.#container = container;
        this.#accountsModel = accountsModel;
        this.#onAccountSelect = onAccountSelect;
        this.#onAddAccount = onAddAccount;

        this.#accountsModel.addObserver(this.#handleModelEvent);
    }

    get accounts() {
        const { searchTerm, category } = this.#currentFilter;
        const allAccounts = this.#accountsModel.accounts;

        const filteredAccounts = allAccounts.filter(account => {
            const matchesCategory = category ? account.category === category : true;
            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearch = searchTerm ? 
                account.name.toLowerCase().includes(searchTermLower) ||
                account.username.toLowerCase().includes(searchTermLower)
                : true;
            return matchesCategory && matchesSearch;
        });

        return filteredAccounts;
    }

    init() {
        render(this.#mainPageComponent, this.#container, RenderPosition.BEFOREEND);

        render(this.#passwordGeneratorComponent, this.#mainPageComponent.generatorContainer);
        render(this.#searchFilterComponent, this.#mainPageComponent.filterContainer);

        if (this.#onAddAccount) {
            this.#searchFilterComponent.setAddAccountHandler(this.#onAddAccount);
        }
        this.#searchFilterComponent.setFilterChangeHandler(this.#handleFilterChange);

        this.#renderAccountList();
    }

    #handleFilterChange = (filter) => {
        this.#currentFilter = filter;
        this.#renderAccountList();
    }

    #handleModelEvent = () => {
        this.#renderAccountList();
    }

    #clearAccountList() {
        this.#accountCardComponents.forEach((component) => remove(component));
        this.#accountCardComponents.clear();
    }

    #renderAccountList() {
        this.#clearAccountList();
        const accounts = this.accounts;
        const accountsContainer = this.#mainPageComponent.accountsContainer;
        
        accounts.forEach((account) => {
            this.#renderAccount(account, accountsContainer);
        });
    }

    #renderAccount(account, container) {
        const accountCard = new AccountCardComponent(account);
        accountCard.setClickHandler(() => {
            if (this.#onAccountSelect) {
                this.#onAccountSelect(account);
            }
        });
        this.#accountCardComponents.set(account.id, accountCard);
        render(accountCard, container);
    }
    
    destroy() {
        this.#clearAccountList();
        remove(this.#passwordGeneratorComponent);
        remove(this.#searchFilterComponent);
        remove(this.#mainPageComponent);
        this.#accountsModel.removeObserver(this.#handleModelEvent);
    }
}

export default AccountPresenter;
