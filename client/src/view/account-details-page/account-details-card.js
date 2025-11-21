import { AbstractComponent } from "../../framework/view/abstract-component.js";

const createAccountDetailsCard = (account) => {
    const { title, username, password, url, category, description } = account;

    return (`
        <div class="card account-details" style="margin: 30px auto;">
            <h2>Детали аккаунта</h2>

            <div class="detail-row">
                <div class="detail-label">Название:</div>
                <div class="detail-value" id="detail-name">${title}</div>
            </div>

            <div class="detail-row">
                <div class="detail-label">Имя пользователя:</div>
                <div class="detail-value" id="detail-username">${username}</div>
            </div>

            <div class="detail-row">
                <div class="detail-label">Пароль:</div>
                <div class="detail-value password-field">
                    <span class="password-text" id="detail-password">${"*".repeat(password.length)}</span>
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
                <div class="detail-value" id="detail-url"><a href=${url}
                    target="_blank">${url}</a></div>
            </div>

            <div class="detail-row">
                <div class="detail-label">Категория:</div>
                <div class="detail-value" id="detail-category">${category}</div>
            </div>

            <div class="detail-row" style="border-bottom: none;">
                <div class="detail-label">Примечания:</div>
                <div class="detail-value" id="detail-notes">${description}</div>
            </div>

            <div class="actions" style="justify-content: flex-start;">
                <button type="button" id="edit-account">Редактировать</button>
                <button type="button" class="btn-danger" id="delete-account">Удалить</button>
                <button type="button" class="btn-secondary" onclick="window.location.href='index.html'">Назад к
                    аккаунтам</button>
            </div>
        </div>
    `);
};

class AccountDetailsCard extends AbstractComponent {
    constructor(account) {
        super();
        this._account = account;
    }

    get template() {
        return createAccountDetailsCard(this._account);
    }
}

export default AccountDetailsCard;