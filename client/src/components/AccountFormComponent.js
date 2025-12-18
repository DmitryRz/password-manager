// /components/AccountFormComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const createAccountFormTemplate = (accountData = {}) => {
    const {
        name = '',
        username = '',
        password = '',
        url = '',
        category = '',
        description = ''
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
                <label for="description">Описание</label>
                <textarea id="description" rows="3">${description}</textarea>
            </div>

            <div class="actions" style="margin-top: 25px; display: flex; justify-content: flex-end;">
                <button type="submit">Сохранить</button>
                <button type="button" class="btn-secondary" id="cancel-form">Отмена</button>
            </div>
        </form>
    `);
};

class AccountFormComponent extends AbstractComponent {
    constructor(accountData) {
        super();
        this._accountData = accountData || {};
        this._callback = {};

        this.#setInnerHandlers();
    }

    get template() {
        return createAccountFormTemplate(this._accountData);
    }

    setCancelClickHandler(callback) {
        this._callback.cancel = callback;
        this.element.querySelector('#cancel-form').addEventListener('click', (evt) => {
            evt.preventDefault();
            this._callback.cancel?.();
        });
    }

    setSaveHandler(callback) {
        this._callback.save = callback;
        this.element.addEventListener('submit', this.#saveHandler);
    }

    #setInnerHandlers() {
        const passwordInput = this.element.querySelector('#password');
        const toggleButton = this.element.querySelector('#toggle-password');

        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    toggleButton.textContent = 'Скрыть';
                } else {
                    passwordInput.type = 'password';
                    toggleButton.textContent = 'Показать';
                }
            });
        }
    }

    #saveHandler = (evt) => {
        evt.preventDefault();
        this._callback.save?.(this.#getFormData());
    }

    #getFormData() {
        const form = this.element;
        return {
            name: form.querySelector('#account-name').value,
            username: form.querySelector('#username').value,
            password: form.querySelector('#password').value,
            url: form.querySelector('#url').value,
            category: form.querySelector('#category').value,
            description: form.querySelector('#description').value,
            ...(this._accountData.id && { id: this._accountData.id })
        };
    }
}

export default AccountFormComponent;