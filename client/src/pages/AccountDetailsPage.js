// client/src/pages/AccountDetailsPage.js
import { AbstractComponent } from "../framework/view/abstract-component.js";

const createAccountDetailsPageTemplate = () => {
    return (`
        <main class="container">
            <div id="account-details-page" class="page">
            </div>
        </main>
    `);
}

class AccountDetailsPage extends AbstractComponent {
    get detailsContainer() {
        return this.element.querySelector('#account-details-page');
    }

    get template() {
        return createAccountDetailsPageTemplate();
    }
}

export default AccountDetailsPage;
