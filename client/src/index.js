import HeaderComponent from "./components/HeaderComponent.js";
import { render, RenderPosition, remove } from "./framework/render.js";
import AccountsModel from "./models/AccountsModel.js";
import AccountPresenter from "./presenter/AccountPresenter.js";

const appRootElement = document.getElementById('app-root');

const headerComponent = new HeaderComponent();
render(headerComponent, appRootElement, RenderPosition.AFTERBEGIN);


const accountsModel = new AccountsModel();

const accountPresenter = new AccountPresenter({
    container: document.getElementById('app-root'),
    accountsModel: accountsModel
});

accountPresenter.init();