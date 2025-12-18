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
    get template() {
        return createSearchFilterTemplate();
    }
}

export default SearchFilterComponent;