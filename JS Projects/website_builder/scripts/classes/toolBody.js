import { ToolType } from "./ToolType.js";

export class ToolBody {
    static #generateInput = () => {
        const inputElement = document.createElement("input");
        inputElement.classList.add("input-element");

        inputElement.type = "text";
        inputElement.placeholder = "Enter text here...";

        return inputElement;
    };

    static #generateSelect = () => {
        const select = document.createElement("select");
        select.classList.add("select-element");

        return select;
    };

    static #generateSize = () => {
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
    };

    static #generateColor = () => {
        const colorElement = document.createElement("input");
        colorElement.classList.add("color-element");

        colorElement.type = "color";

        return colorElement;
    };

    static #generateTextArea = () => {
        const textArea = document.createElement("textarea");
        textArea.classList.add("text-area-element");

        textArea.style.resize = "none";

        return textArea;
    };

    static get input() {
        return ToolBody.#generateInput();
    }

    static get select() {
        return ToolBody.#generateSelect();
    }

    static get size() {
        return ToolBody.#generateSize();
    }

    static get color() {
        return ToolBody.#generateColor();
    }

    static get textArea() {
        return ToolBody.#generateTextArea();
    }

    static validate(toolType) {
        return toolType instanceof ToolBody;
    }

    static getType(toolBody) {
        if (!toolBody) {
            throw new Error("Tool body was not initialized.");
        }

        if (!ToolBody instanceof ToolBody) {
            throw new Error("Tool body is not of type ToolBody.");
        }

        console.log("toolBody", toolBody);

        if (toolBody.classList.contains("select-element")) {
            return ToolType.select;
        } else if (toolBody.classList.contains("input-element")) {
            return ToolType.input;
        } else if (toolBody.classList.contains("size-element")) {
            return ToolType.size;
        } else if (toolBody.classList.contains("color-element")) {
            return ToolType.color;
        } else if (toolBody.classList.contains("text-area-element")) {
            return ToolType.textArea;
        }
    }
}
