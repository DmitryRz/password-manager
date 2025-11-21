import { AbstractComponent } from '../../framework/view/abstract-component.js';

const createHeaderComponent = () => {
    return (
        `<header>
            <div class="container header-content">
                <div class="logo">Менеджер паролей</div>
                <nav>
                    <ul>
                        <li>
                            <a class="nav-link" data-page="main">Главная</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>`
    );
};

class HeaderComponent extends AbstractComponent {
    get template() {
        return createHeaderComponent();
    }
}

export default HeaderComponent;