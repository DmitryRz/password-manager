// /components/PasswordGeneratorComponent.js

import { AbstractComponent } from "../framework/view/abstract-component.js";

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS_CHARS = '0123456789';
const SYMBOLS_CHARS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

const createPasswordGeneratorTemplate = () => {
    return (`
        <div class="card">
            <h2>Генератор паролей</h2>

            <div class="password-generator">
                <div class="password-display" id="generated-password">Нажмите "Сгенерировать"</div>

                <div>
                    <label>Длина пароля</label>
                    <input type="number" id="password-length" min="6" max="50" value="12">
                </div>

                <div class="password-options">
                    <div>
                        <label>Заглавные буквы (A-Z)</label>
                        <input type="checkbox" id="include-uppercase" checked>
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
    `);
};

class PasswordGeneratorComponent extends AbstractComponent {
    get template() {
        return createPasswordGeneratorTemplate();
    }

    constructor() {
        super();
        
        const lengthInput = this.element.querySelector('#password-length');
        const labelPassword = this.element.querySelector('#generated-password');
        const generateButton = this.element.querySelector('#generate-btn');
        
        if (generateButton) {
            generateButton.addEventListener('click', () => {
                const length = parseInt(lengthInput.value, 10);
                const min = parseInt(lengthInput.min, 10);
                const max = parseInt(lengthInput.max, 10);
                
                if (length < min || length > max) {
                    labelPassword.textContent = `Длина должна быть от ${min} до ${max}.`;
                    return;
                }

                const includeUppercase = this.element.querySelector('#include-uppercase').checked;
                const includeLowercase = this.element.querySelector('#include-lowercase').checked;
                const includeNumbers = this.element.querySelector('#include-numbers').checked;
                const includeSymbols = this.element.querySelector('#include-symbols').checked;
                
                labelPassword.textContent = this._generatePassword(
                    length, 
                    includeUppercase, 
                    includeLowercase, 
                    includeNumbers, 
                    includeSymbols
                );
            });
        }
    }

    _generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
        let allChars = '';

        if (includeUppercase) {
            allChars += UPPERCASE_CHARS;
        }
        if (includeLowercase) {
            allChars += LOWERCASE_CHARS;
        }
        if (includeNumbers) {
            allChars += NUMBERS_CHARS;
        }
        if (includeSymbols) {
            allChars += SYMBOLS_CHARS;
        }

        if (allChars.length === 0) {
            return 'Выберите хотя бы один тип символов.';
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }

        return password;
    }
}

export default PasswordGeneratorComponent;