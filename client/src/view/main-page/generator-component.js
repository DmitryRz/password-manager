import {AbstractComponent} from "../../framework/view/abstract-component.js";


const createGeneratorComponent = () => {
    return (
        `<div class="generator-section">
            <div class="card">
                <h2>Генератор паролей</h2>

                <div class="password-generator">
                    <div class="password-display" id="generated-password">password</div>

                    <div>
                        <label>Длина пароля</label>
                        <input type="number" id="password-length" min="6" max="50" value="12">
                    </div>

                    <div class="password-options">
                        <div>
                            <label>Заглавные буквы (A-Z)</label>
                            <input type="checkbox" id="include-uppercase">
                        </div>
                        <div>
                            <label>Строчные буквы (a-z)</label>
                            <input type="checkbox" id="include-lowercase">
                        </div>
                        <div>
                            <label>Цифры (0-9)</label>
                            <input type="checkbox" id="include-numbers">
                        </div>
                        <div>
                            <label>Символы (!@#$%^&*)</label>
                            <input type="checkbox" id="include-symbols">
                        </div>
                    </div>

                    <div class="password-actions">
                        <button id="generate-btn">Сгенерировать</button>
                    </div>
                </div>
            </div>
        </div>`
    );
};

class GeneratorComponent extends AbstractComponent {
    get template() {
        return createGeneratorComponent();
    }
}


export default GeneratorComponent;