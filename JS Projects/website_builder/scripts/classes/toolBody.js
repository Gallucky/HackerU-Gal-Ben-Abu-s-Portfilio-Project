export class ToolBody {
    // Static fields to access like Math.PI and other fields...
    static sizeElement = ToolBody.#initializeSizeElement();
    static inputElement = ToolBody.#initializeInputElement();
    static colorElement = ToolBody.#initializeColorElement();
    static selectElement = ToolBody.#initializeSelectElement();

    // Public Methods:

    /**
     * Returns the type of the tool body element.
     * If the tool body element is not an instance of ToolBody returns undefined.
     * @param {ToolBody.FieldElement} toolBodyElement
     * @returns {string | undefined}
     */
    static getType(toolBodyElement) {
        if (!toolBodyElement || !toolBodyElement instanceof ToolBody) {
            return undefined;
        }

        if (toolBodyElement.classList.includes("size-element")) {
            return "size";
        } else if (toolBodyElement.classList.includes("input-element")) {
            return "input";
        } else if (toolBodyElement.classList.includes("color-element")) {
            return "color";
        } else if (toolBodyElement.classList.includes("select-element")) {
            return "select";
        }
    }

    // Private methods like Math.floor and other methods which are
    // public methods, here those methods will be hidden.
    static #initializeSizeElement() {
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

    static #initializeInputElement() {
        const input = document.createElement("input");
        input.classList.add("input-element");

        input.type = "text";
        input.placeholder = "Enter text here...";

        return input;
    }

    static #initializeColorElement() {
        const color = document.createElement("input");
        color.classList.add("color-element");

        color.type = "color";

        return color;
    }

    static #initializeSelectElement() {
        const select = document.createElement("select");
        select.classList.add("select-element");

        return select;
    }
}
