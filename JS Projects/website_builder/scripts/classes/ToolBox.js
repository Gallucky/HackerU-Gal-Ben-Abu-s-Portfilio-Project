import { Tool } from "./Tool.js";

/**
 * Represents a collection of tools.
 * @class
 * @see {Tool}
 */
export class ToolBox {
    #tools;

    /**
     * Initializes a new instance of the ToolBox class.
     * Creates an empty map to store tools.
     */
    constructor() {
        this.#tools = new Map();
    }

    /**
     * Retrieves the tools stored in the ToolBox.
     * @returns {Map} A map containing the tools.
     */
    get tools() {
        return this.#tools;
    }

    /**
     * Adds the given tool to the ToolBox.
     * @param {Tool} tool The tool to add.
     */
    addTool(tool) {
        this.#tools.set(tool.name, tool);
    }

    /**
     * Retrieves the tool with the given name from the ToolBox.
     * @param {string} toolName The name of the tool to retrieve.
     * @returns {Tool} The tool with the given name, or undefined if no such tool exists.
     */
    getTool(toolName) {
        return this.#tools.get(toolName);
    }
}
