import { render, RenderPosition } from "./framework/render.js";
import HeaderComponent from "./view/header-component/header-component.js";
import MainPage from "./view/main-page/main-page.js";
import GeneratorComponent from "./view/main-page/generator-component.js";
import AccountListComponent from "./view/main-page/account-list-component.js";
import AccountCardComponent from "./view/main-page/account-card-component.js";
import AccountDetailsPage from "./view/account-details-page/account-details-page.js";
import AccountDetailsCard from "./view/account-details-page/account-details-card.js";

const mockAccounts = [
    { title: "GitHub", username: "DmitryRz", category: "Работа" },
    { title: "Instagram", username: "user_insta", category: "Социальные сети" },
];

const mockAccountDetails = {
    title: "GitHub",
    username: "DmitryRz",
    password: "123123",
    url: "https://github.com/",
    category: "Работа",
    description: "Мой аккаунт GitHub"
}


const bodyContainer = document.querySelector('.body');
const container = document.querySelector('.container');

if (!bodyContainer || !container) {
    console.error('Корневые контейнеры .body или .container не найдены.');
    throw new Error('Root containers not found.');
}

const headerComponent = new HeaderComponent();
render(headerComponent, bodyContainer, RenderPosition.AFTERBEGIN);

const mainPage = new MainPage();
render(mainPage, container);
const mainPageElement = mainPage.element

if (mainPageElement) {
    const generatorComponent = new GeneratorComponent();
    render(generatorComponent, mainPageElement);

    const accountListComponent = new AccountListComponent();
    render(accountListComponent, mainPageElement);

    const accountsContainer = accountListComponent.accountsContainer;
    if (accountsContainer) {
        mockAccounts.forEach((account) => {
            const accountCardComponent = new AccountCardComponent(account);
            render(accountCardComponent, accountsContainer);
        });
    }
}

const accountDetailsPage = new AccountDetailsPage();
render(accountDetailsPage, container);
const accountPageElement = accountDetailsPage.element

if (accountPageElement) {
    const accountDetailsCard = new AccountDetailsCard(mockAccountDetails);
    render(accountDetailsCard, accountPageElement);
}