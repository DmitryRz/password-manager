import {AbstractComponent} from "../../framework/view/abstract-component.js";

const createMainPage = () => {
    return (`
        <div id="main-page" class="page main-content">

        </div>   
    `);
};

class MainPage extends AbstractComponent {
    get template() {
        return createMainPage();
    }
}


export default MainPage;