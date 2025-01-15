/**
 * The type for the tool object.
 * @static @class
 * @see Tool
 */
export class ToolType {
    static #input = "Input";
    static #select = "Select";
    static #size = "Size";
    static #color = "Color";
    static #textArea = "TextArea";

    static get input() {
        return ToolType.#input;
    }

    static get select() {
        return ToolType.#select;
    }

    static get size() {
        return ToolType.#size;
    }

    static get color() {
        return ToolType.#color;
    }

    static get textArea() {
        return ToolType.#textArea;
    }

    static validate(toolType) {
        return toolType instanceof ToolType;
    }

    static getTypes() {
        return [ToolType.input, ToolType.select, ToolType.size, ToolType.color, ToolType.textArea];
    }
}
