// /components/AccountFormComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const createAccountFormTemplate = (accountData = {}) => {
    const {
        name = '',
        username = '',
        password = '',
        url = '',
        category = '',
        notes = ''
    } = accountData;

    return (`
        <form id="add-account-form">
            <div class="form-group">
                <label for="account-name">Название аккаунта *</label>
                <input type="text" id="account-name" value="${name}" required>
            </div>

            <div class="form-group">
                <label for="username">Имя пользователя/Email *</label>
                <input type="text" id="username" value="${username}" required>
            </div>

            <div class="form-group">
                <label for="password">Пароль *</label>
                <div class="password-field">
                    <input type="password" id="password" value="${password}" required>
                    <button type="button" class="btn-secondary"
                        style="margin-left: 10px; width: auto; flex-shrink: 0;"
                        id="toggle-password">Показать</button>
                    <button type="button" class="btn-secondary"
                        style="margin-left: 10px; width: auto; flex-shrink: 0;"
                        id="use-generated-password">Использовать сгенерированный</button>
                </div>
            </div>

            <div class="form-group">
                <label for="url">URL сайта</label>
                <input type="url" id="url" value="${url}" placeholder="https://example.com">
            </div>

            <div class="form-group">
                <label for="category">Категория</label>
                <select id="category">
                    <option value="" ${category === '' ? 'selected' : ''} disabled>Выберите категорию</option>
                    <option value="Социальные сети" ${category === 'Социальные сети' ? 'selected' : ''}>Социальные сети</option>
                    <option value="Работа" ${category === 'Работа' ? 'selected' : ''}>Работа</option>
                    <option value="Финансы" ${category === 'Финансы' ? 'selected' : ''}>Финансы</option>
                    <option value="Развлечения" ${category === 'Развлечения' ? 'selected' : ''}>Развлечения</option>
                    <option value="Другое" ${category === 'Другое' ? 'selected' : ''}>Другое</option>
                </select>
            </div>

            <div class="form-group">
                <label for="notes">Примечания</label>
                <textarea id="notes" rows="3">${notes}</textarea>
            </div>

            <div class="actions" style="margin-top: 25px; display: flex; justify-content: flex-end;">
                <button type="submit">Сохранить</button>
                <button type="button" class="btn-secondary" onclick="window.history.back()">Отмена</button>
            </div>
        </form>
    `);
};

class AccountFormComponent extends AbstractComponent {
    constructor(accountData) {
        super();
        this._accountData = accountData || {};
    }

    get template() {
        return createAccountFormTemplate(this._accountData);
    }
}

export default AccountFormComponent;