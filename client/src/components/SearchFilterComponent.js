// /components/SearchFilterComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const createSearchFilterTemplate = () => {
    return (`
        <div class="search-filter">
            <input type="text" id="search-input" placeholder="Поиск по названию или имени пользователя">
            <select id="category-filter">
                <option value="">Все категории</option>
                <option value="Социальные сети">Социальные сети</option>
                <option value="Работа">Работа</option>
                <option value="Финансы">Финансы</option>
                <option value="Развлечения">Развлечения</option>
            </select>
            <button id="add-account-btn">Добавить аккаунт</button>
        </div>
    `);
};

class SearchFilterComponent extends AbstractComponent {
    constructor() {
        super();
        this._callback = {};
    }

    get template() {
        return createSearchFilterTemplate();
    }

    setAddAccountHandler(callback) {
        this._callback.addAccount = callback;
        this.element.querySelector('#add-account-btn').addEventListener('click', this.#addAccountHandler);
    }

    setFilterChangeHandler(callback) {
        this._callback.filterChange = callback;
        this.element.querySelector('#search-input').addEventListener('input', this.#filterChangeHandler);
        this.element.querySelector('#category-filter').addEventListener('change', this.#filterChangeHandler);
    }

    #addAccountHandler = (evt) => {
        evt.preventDefault();
        this._callback.addAccount?.();
    };

    #filterChangeHandler = (evt) => {
        evt.preventDefault();
        this._callback.filterChange?.({
            searchTerm: this.element.querySelector('#search-input').value,
            category: this.element.querySelector('#category-filter').value
        });
    }
}

export default SearchFilterComponent;