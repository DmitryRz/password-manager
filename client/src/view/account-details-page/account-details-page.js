import {AbstractComponent} from "../../framework/view/abstract-component.js";

const createAccountDetailsPage = () => {
    return (`
        <div id="account-details-page" class="page">

        </div>   
    `);
};


class AccountDetailsPage extends AbstractComponent {
    get template() {
        return createAccountDetailsPage();
    }
}

export default AccountDetailsPage;

