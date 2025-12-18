import { AbstractComponent } from "../framework/view/abstract-component.js";

class MainPage extends AbstractComponent {
    get generatorContainer() {
        return this.element.querySelector('.generator-section');
    }
    
    get filterContainer() {
        return this.element.querySelector('.filter-section');
    }

    get accountsContainer() {
        return this.element.querySelector('#accounts-container');
    }

    get template() {
        return (`
            <main class="container">
                <div id="main-page" class="page main-content">
                    <div class="generator-section"></div>
                    <div class="accounts-section">
                        <div class="card">
                            <h2>Мои аккаунты</h2>
                            <div class="filter-section"></div>
                            <div class="accounts-grid" id="accounts-container"></div>
                        </div>
                    </div>
                </div>
            </main>
        `);
    }
}

export default MainPage;
