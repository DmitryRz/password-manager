// /components/AccountDetailsDisplayComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const createAccountDetailsTemplate = (details) => {
    const {
        name,
        username,
        passwordPlaceholder,
        url,
        category,
        notes
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
                <div class="detail-label">Примечания:</div>
                <div class="detail-value" id="detail-notes">${notes}</div>
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
    }

    get template() {
        const displayDetails = {
            name: this._details.name || 'Название не указано',
            username: this._details.username || 'Логин не указан',
            passwordPlaceholder: '******', 
            url: this._details.url || '',
            category: this._details.category || 'Не указана',
            notes: this._details.notes || 'Нет примечаний'
        };
        return createAccountDetailsTemplate(displayDetails);
    }

    setBackToAccountsHandler(callback) {
        this._callback.backToAccounts = callback;
        console.log(callback)
        console.log("вернуть к аккаунтам обработчик установлен");

        this.element.querySelector('#back-to-accounts')
            .addEventListener('click', this._backToAccountsHandler);
    }

    _backToAccountsHandler = (evt) => {
        evt.preventDefault();
        if (this._callback.backToAccounts) {
            this._callback.backToAccounts();
        }
    };
}

export default AccountDetailsDisplayComponent;