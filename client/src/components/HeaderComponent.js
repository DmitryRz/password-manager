// /components/HeaderComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const createHeaderTemplate = () => {
    return (`
        <header>
            <div class="container header-content">
                <div class="logo">Менеджер паролей</div>
                <nav>
                    <ul>
                        <li><a class="nav-link" data-page="main">Главная</a></li>
                        <li><a class="nav-link" data-page="add-account">Добавить аккаунт</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    `);
};

class HeaderComponent extends AbstractComponent {
    get template() {
        return createHeaderTemplate();
    }

    #pageChangeCallback = null;

    constructor() {
        super();
        this.#setInnerHandlers();
    }

    setPageChangeHandler(callback) {
        this.#pageChangeCallback = callback;
    }

    #setInnerHandlers() {
        const navLinks = this.element.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const dataPageValue = event.currentTarget.getAttribute('data-page');

                if (this.#pageChangeCallback) {
                    this.#pageChangeCallback(dataPageValue);
                }
            });
        });
    }
}

export default HeaderComponent;