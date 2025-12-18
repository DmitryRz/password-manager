// client/src/pages/AddAccountPage.js
import { AbstractComponent } from "../framework/view/abstract-component.js";

const createAddAccountPageTemplate = (title) => {
    return (`
        <main class="container">
            <div id="account-form-page" class="page">
                <div class="card" style="max-width: 600px; margin: 30px auto;">
                    <h2>${title}</h2>
                </div>
            </div>
        </main>
    `);
}

class AddAccountPage extends AbstractComponent {
    #title = 'Добавить аккаунт';

    constructor(title) {
        super();
        if (title) {
            this.#title = title;
        }
    }

    get formContainer() {
        return this.element.querySelector('.card');
    }

    get template() {
        return createAddAccountPageTemplate(this.#title);
    }
}

export default AddAccountPage;
