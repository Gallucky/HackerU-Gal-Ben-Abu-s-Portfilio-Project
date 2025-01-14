import { ToolBody } from "./toolBody.js";
import { ToolType } from "./ToolType.js";

export class Tool {
    #name;
    #description;
    #toolType;
    #element;
    #toolID;

    static #id = 0;

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
        Tool.#id++;
        this.#toolID = Tool.#id;

        this.#element = document.createElement("div");
        this.#element.classList.add("tool");

        this.#toolType = undefined;
    }

    getID() {
        return this.#toolID;
    }

    getToolType() {
        // Preventing a return value of undefined.
        if (!this.#toolType) {
            throw new Error("Tool type was not initialized.");
        }

        return this.toolType;
    }

    getElement() {
        return this.#element;
    }

    getName() {
        return this.#name;
    }

    setName(newName) {
        this.#name = newName;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(newDescription) {
        this.#description = newDescription;
    }

    addToolBody(toolBodyElement) {
        if (!toolBodyElement) {
            throw new Error("Tool body was not initialized.");
        }

        if (!toolBodyElement instanceof ToolBody) {
            throw new Error("Tool body is not of type ToolBody.");
        }

        const toolType = ToolBody.getType(toolBodyElement);

        if (!toolType) {
            throw new Error("Tool body's type is invalid.");
        }

        this.#toolType = toolType;
        this.#element.appendChild(toolBodyElement);
    }

    setToolType(toolType) {
        if (!toolType) {
            throw new Error("Tool type was not initialized.");
        }

        if (ToolBody.validate(toolType)) {
            this.#toolType = toolType;
            console.log("Tool type was set.");
        } else {
            console.log("Tool type is invalid.");
        }
    }
}
