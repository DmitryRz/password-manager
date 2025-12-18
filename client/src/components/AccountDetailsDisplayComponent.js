// /components/AccountDetailsDisplayComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const createAccountDetailsTemplate = (details) => {
    const {
        name,
        username,
        passwordPlaceholder,
        url,
        category,
        description
    } = details;

    const urlLink = url ? `<a href="${url}" target="_blank">${url}</a>` : '';

    return (`
        <div class="card account-details" style="margin: 30px auto;">
            <h2>Детали аккаунта</h2>

            <div class="detail-row">
                <div class="detail-label">Название:</div>
                <div class="detail-value" id="detail-name">${name}</div>
            </div>

            <div class="detail-row">
                <div class="detail-label">Имя пользователя:</div>
                <div class="detail-value" id="detail-username">${username}</div>
            </div>

            <div class="detail-row">
                <div class="detail-label">Пароль:</div>
                <div class="detail-value password-field">
                    <span class="password-text" id="detail-password">${passwordPlaceholder}</span>
                    <button type="button" class="btn-secondary"
                        style="margin-left: 10px; width: auto; flex-shrink: 0;"
                        id="details-toggle-password">Показать</button>
                    <button type="button" class="btn-secondary"
                        style="margin-left: 10px; width: auto; flex-shrink: 0;"
                        id="details-copy-password">Копировать</button>
                </div>
            </div>

            <div class="detail-row">
                <div class="detail-label">URL:</div>
                <div class="detail-value" id="detail-url">${urlLink}</div>
            </div>

            <div class="detail-row">
                <div class="detail-label">Категория:</div>
                <div class="detail-value" id="detail-category">${category}</div>
            </div>

            <div class="detail-row" style="border-bottom: none;">
                <div class="detail-label">Описание:</div>
                <div class="detail-value" id="detail-description">${description}</div>
            </div>

            <div class="actions" style="justify-content: flex-start;">
                <button type="button" id="edit-account">Редактировать</button>
                <button type="button" class="btn-danger" id="delete-account">Удалить</button>
                <button type="button" class="btn-secondary" id="back-to-accounts">Назад к аккаунтам</button>
            </div>
        </div>
    `);
};

class AccountDetailsDisplayComponent extends AbstractComponent {
    constructor(details) {
        super();
        this._details = details;
        this._callback = {};
        this._isPasswordVisible = false;
        
        this.#setInnerHandlers();
    }

    get template() {
        const displayDetails = {
            name: this._details.name || 'Название не указано',
            username: this._details.username || 'Логин не указан',
            passwordPlaceholder: '******', 
            url: this._details.url || '',
            category: this._details.category || 'Не указана',
            description: this._details.description || 'Нет описания'
        };
        return createAccountDetailsTemplate(displayDetails);
    }

    #setInnerHandlers() {
        const toggleBtn = this.element.querySelector('#details-toggle-password');
        const passwordSpan = this.element.querySelector('#detail-password');

        toggleBtn.addEventListener('click', () => {
            this._isPasswordVisible = !this._isPasswordVisible;
            if (this._isPasswordVisible) {
                passwordSpan.textContent = this._details.password;
                toggleBtn.textContent = 'Скрыть';
            } else {
                passwordSpan.textContent = '******';
                toggleBtn.textContent = 'Показать';
            }
        });

        const copyBtn = this.element.querySelector('#details-copy-password');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(this._details.password);
        });
    }

    setBackToAccountsHandler(callback) {
        this._callback.backToAccounts = callback;
        this.element.querySelector('#back-to-accounts')
            .addEventListener('click', this._backToAccountsHandler);
    }

    _backToAccountsHandler = (evt) => {
        evt.preventDefault();
        this._callback.backToAccounts?.();
    };

    setDeleteHandler(callback) {
        this._callback.delete = callback;
        this.element.querySelector('#delete-account').addEventListener('click', this.#deleteHandler);
    }

    #deleteHandler = (evt) => {
        evt.preventDefault();
        this._callback.delete?.();
    }

    setEditHandler(callback) {
        this._callback.edit = callback;
        this.element.querySelector('#edit-account').addEventListener('click', this.#editHandler);
    }

    #editHandler = (evt) => {
        evt.preventDefault();
        this._callback.edit?.();
    }
}

export default AccountDetailsDisplayComponent;