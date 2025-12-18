import HeaderComponent from "./components/HeaderComponent.js";
import { render, RenderPosition } from "./framework/render.js";
import AccountsModel from "./models/AccountsModel.js";
import AccountPresenter from "./presenter/AccountPresenter.js";
import AddAccountPresenter from "./presenter/AddAccountPresenter.js";
import AccountDetailsPresenter from "./presenter/AccountDetailsPresenter.js";
import AccountsApiService from "./api/accounts-api-service.js";

const AUTHORIZATION = 'Basic hS2sd3dfSwcl1sa2j';
const END_POINT = 'http://localhost:8080/api';


const appRootElement = document.getElementById('app-root');
const accountsModel = new AccountsModel(new AccountsApiService(END_POINT, AUTHORIZATION));

const headerComponent = new HeaderComponent();
render(headerComponent, appRootElement, RenderPosition.AFTERBEGIN);

let currentPresenter = null;

const navigateTo = (page, data = null) => {
    currentPresenter?.destroy();
    currentPresenter = null;

    const mainContainer = appRootElement;

    switch (page) {
        case 'main': {
            const accountPresenter = new AccountPresenter({
                container: mainContainer,
                accountsModel: accountsModel,
                onAccountSelect: (account) => navigateTo('details', account),
                onAddAccount: () => navigateTo('add-account')
            });
            accountPresenter.init();
            currentPresenter = accountPresenter;
            break;
        }
        case 'add-account': {
            const addAccountPresenter = new AddAccountPresenter({
                container: mainContainer,
                accountsModel: accountsModel,
                onFinish: () => navigateTo('main'),
                accountData: data
            });
            addAccountPresenter.init();
            currentPresenter = addAccountPresenter;
            break;
        }
        case 'details': {
            if (!data) {
                navigateTo('main');
                return;
            }
            const accountDetailsPresenter = new AccountDetailsPresenter({
                container: mainContainer,
                account: data,
                accountsModel: accountsModel,
                onBack: () => navigateTo('main'),
                onNavigate: navigateTo
            });
            accountDetailsPresenter.init();
            currentPresenter = accountDetailsPresenter;
            break;
        }
    }
};

headerComponent.setPageChangeHandler((page) => navigateTo(page));

appRootElement.insertAdjacentHTML('beforeend', '<p>Loading...</p>');

accountsModel.init()
  .finally(() => {
      appRootElement.querySelector('p').remove();
      navigateTo('main');
  });