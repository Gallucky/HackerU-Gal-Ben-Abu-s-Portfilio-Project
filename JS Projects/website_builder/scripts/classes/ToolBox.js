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
     * Gets an iterator of all the tools in the ToolBox.
     * @returns {Iterator.<Tool>} An iterator of all the tools in the ToolBox.
     */
    get tools() {
        return this.#tools.values();
    }

    /**
     * Gets the number of tools in the ToolBox.
     * @returns {number} The number of tools in the ToolBox.
     */
    get size() {
        return this.#tools.size;
    }

    /**
     * Adds the given tool to the ToolBox.
     * @param {Tool} tool The tool to add.
     */
    addTool(tool) {
        this.#tools.set(tool.toolID, tool);
    }

    /**
     * Retrieves the tool with the given name from the ToolBox.
     * @param {string} toolName The name of the tool to retrieve.
     * @returns {Array<Tool>} An array containing all of the tools
     * with the given name, if there is no tool with the name given
     * then an empty array is returned.
     */
    getTool(toolName) {
        const toolWithGivenName = [];
        this.#tools.forEach((tool) => {
            if (tool.name === toolName) {
                toolWithGivenName.push(tool);
            }
        });

        return toolWithGivenName;
    }

    /**
     * Retrieves the tool with the given ID from the ToolBox.
     * @param {number} toolID The ID of the tool to retrieve.
     * @returns {Tool} The tool with the given ID, or undefined if no such tool exists.
     */
    getTool(toolID) {
        return this.#tools.get(toolID);
    }

    /**
     * Adds all the tools in the ToolBox to the .tools-panel element.
     *
     * This method will throw an error if no .tools-panel element is found, or if there are no tools in the ToolBox.
     *
     * @throws {Error} If no .tools-panel element is found.
     * @throws {Error} If there are no tools in the ToolBox.
     */
    addToolsToToolPanel() {
        const toolPanel = document.querySelector(".tools-panel");

        if (!toolPanel) {
            throw new Error("No tool panel found.");
        }

        if (this.#tools.size === 0) {
            throw new Error("No tools found.");
        }

        for (const tool of this.#tools.values()) {
            console.log(tool);

            tool.addToolElementTo(toolPanel);
            console.log(`%cAdded '${tool.name}' to tool panel.`, "color: green;");
        }
    }

    /**
     * Empties the ToolBox by removing all tools.
     */
    empty() {
        this.#tools = new Map();
    }
}
