import { Tool } from "./tool.js";

export class ToolBox {
    /**
     * @field
     * The map of all tools in the tool box attached to /
     * mapped with a key equal to the tool's name.
     * @type {Map<string, Tool>}
     */
    #tools;

    /**
     * Constructor
     * Creator method for all tool boxes instances.
     * @param {ToolBox} tools
     */
    constructor(toolBox = undefined) {
        if (toolBox && toolBox instanceof ToolBox) {
            this.#tools = toolBox.getTools();
        } else {
            this.#tools = {};
        }
    }

    getTools() {
        return this.#tools;
    }

    addTool(tool) {
        this.#tools[tool.name] = tool;
        return this;
    }

    removeTool(toolName) {
        delete this.#tools[toolName];
        return this;
    }

    getTool(toolName) {
        return this.#tools[toolName];
    }

    addToolsToToolPanel() {
        const toolsPanel = document.querySelector(".tools-panel");
        const tools = Object.values(this.#tools);
        if (toolsPanel) {
            for (const tool of tools) {
                tool.addTo(toolsPanel);
            }
            console.log(`The tools were added to the tools panel successfully.`);
        } else {
            console.log(`The tools panel element was not found.`);
        }
    }
}
