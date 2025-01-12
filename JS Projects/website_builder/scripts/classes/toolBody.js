/**
 * `@description`
 * Class for creating tool bodies from a set template.
 * The class contains static methods for ease of access and use.
 *
 * Used by - \@see `Tool`
 */
export class ToolBody {
    // Private methods like Math.floor and other methods which are
    // public methods, here those methods will be hidden.

    /**
     * `@description:`
     * Static method for creating a size element.
     * Creates an @type {HTMLElement} with width and height number inputs and their titles.
     * @example @yields
     * Width: Height:\
     * [number input] [number input]
     * @returns {HTMLElement} The created size element.
     */
    static sizeElement() {
        const sizeElement = document.createElement("div");
        sizeElement.classList.add("size-element");

        const widthTitle = document.createElement("span");
        const heightTitle = document.createElement("span");

        widthTitle.innerText = "Width:";
        heightTitle.innerText = "Height:";

        widthTitle.className = "width-title";
        heightTitle.className = "height-title";

        const widthInput = document.createElement("input");
        const heightInput = document.createElement("input");

        widthInput.className = "tool-size-width-input";
        heightInput.className = "tool-size-height-input";

        widthInput.type = "number";
        widthInput.min = "0";

        heightInput.type = "number";
        heightInput.min = "0";

        sizeElement.appendChild(widthTitle);
        sizeElement.appendChild(widthInput);
        sizeElement.appendChild(heightTitle);
        sizeElement.appendChild(heightInput);

        return sizeElement;
    }

    /**
     * `@description:`
     * Static method for creating a input element.
     * Creates an @type {HTMLElement} with a text input element.
     * @example @yields
     * [text input]
     * @returns {HTMLElement} The created text input element.
     */
    static inputElement() {
        const input = document.createElement("input");
        input.classList.add("input-element");

        input.type = "text";
        input.placeholder = "Enter text here...";

        return input;
    }

    /**
     * `@description:`
     * Static method for creating a color element.
     * Creates an @type {HTMLElement} with a color input element.
     * @example @yields
     * [color input]
     * @returns {HTMLElement} The created color input element.
     */
    static colorElement() {
        const color = document.createElement("input");
        color.classList.add("color-element");

        color.type = "color";

        return color;
    }

    /**
     * `@description:`
     * Static method for creating a select element.
     * Creates an @type {HTMLElement} with a select element.
     * @example @yields
     * [select]
     * @returns {HTMLElement} The created select element.
     */
    static selectElement() {
        const select = document.createElement("select");
        select.classList.add("select-element");

        return select;
    }

    /**
     * `@description:`
     * Static method for creating a textarea element.
     * Creates an @type {`HTMLElement`} with a textarea element.
     * `@example`
     * `@yields`
     * [textarea]
     * @returns {`HTMLElement`} The created textarea element.
     */
    static textAreaElement() {
        const textArea = document.createElement("textarea");
        textArea.classList.add("text-area-element");

        textArea.style.resize = "none";

        return textArea;
    }
}
