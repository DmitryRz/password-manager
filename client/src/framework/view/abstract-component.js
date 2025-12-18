import { createElement } from "../render.js";

export class AbstractComponent {
    #element = null;

    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
        }
    }

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template);
        }

        return this.#element;
    }

    /**
     * @returns {string} Возвращает строку с HTML-шаблоном.
     */
    get template() {
        throw new Error('Abstract method not implemented: get template');
    }

    removeElement() {
        this.#element = null;
    }
}