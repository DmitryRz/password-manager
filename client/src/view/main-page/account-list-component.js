import { AbstractComponent } from "../../framework/view/abstract-component.js";
import {createElement} from "../../framework/render.js";


const createAccountListComponent = () => {

    return (`
        <div class="accounts-section">
            <div class="card">
                <h2>Мои аккаунты</h2>

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


                <div class="accounts-grid" id="accounts-container">
                    
                </div>
            </div>
        </div>
    `);
};


class AccountListComponent extends AbstractComponent {
    get template() {
        return createAccountListComponent();
    }

    get accountsContainer() {
        return this.element.querySelector('#accounts-container');
    }
}


export default AccountListComponent;