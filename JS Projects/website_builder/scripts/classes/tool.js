import { ToolBody } from "./toolBody.js";

/**
 * Class for creating tools
 * @example
 * const textTool = new Tool("Text Tool", "Tool to add text to the created element.");
 * textTool.addLabel("Text:");
 * textTool.addToolBody(ToolBody.textAreaElement());
 *
 * @see ToolBody For more information about tool bodies.
 */
export class Tool {
    /**
     * The name of the tool
     * @field
     * @type string
     */
    name;

    /**
     * The description of the tool
     * @field
     * @type string
     */
    description;

    /**
     * The label element of the tool
     * @field
     * @type HTMLElement
     */
    labelElement;

    /**
     * The tool body element of the tool
     * @field
     * @type HTMLElement
     * Generated from @see ToolBody
     */
    toolBodyElement;

    /**
     * The html element of the tool
     * @field
     * @type HTMLElement
     */
    element;

    /**
     * Creator of tools
     * @param {string} name The name of the tool
     * @param {string} description The description of the tool
     */
    constructor(name, description) {
        this.name = name;
        this.description = description;

        this.element = document.createElement("div");
        this.element.classList.add("tool");

        const linkToolCSS = document.createElement("link");
        linkToolCSS.rel = "stylesheet";
        linkToolCSS.href = "./styles/tools/tool.css";
        document.head.appendChild(linkToolCSS);
    }

    /**
     * Check if the tool has a label
     * @returns {boolean} True if the tool has a label, false otherwise
     */
    hasLabel() {
        return this.labelElement !== undefined;
    }

    /**
     * Add a label to the tool
     * @param {string} text The text to appear on the label. [Defaults to the name of the tool]
     * @param {string} id The id of the label. [Defaults to the name of the tool]
     * @returns {boolean} True if the label was added successfully, false otherwise
     */
    addLabel(text = this.name, id = this.name) {
        if (this.hasLabel()) {
            console.log(
                `[tool.js] - ${this.name}: Label already exists for the tool - Canceling...`
            );

            return false;
        }

        try {
            this.labelElement = document.createElement("label");
            this.labelElement.setAttribute("for", "");
            this.labelElement.innerText = text;
            this.labelElement.id = "tool-" + id + "-label";

            this.element.appendChild(this.labelElement);

            console.log(
                `[tool.js] - ${this.name}: Created and added label to the tool successfully.`
            );
        } catch (err) {
            console.log(`[tool.js] - ${this.name}:`);
            console.log("Failed to add label to the tool.");
            console.log(`Error Message:\n${err}`);
            return false;
        } finally {
            return true;
        }
    }

    /**
     * Remove the label from the tool
     * @returns {boolean} True if the label was removed successfully, false otherwise
     */
    removeLabel() {
        if (this.hasLabel()) {
            this.element.removeChild(this.labelElement);
            this.labelElement = undefined;
            console.log(`[tool.js] - ${this.name}: Removed label from the tool successfully.`);
            return true;
        }
        return false;
    }

    /**
     * Check if the tool has a tool body
     * @returns {boolean} True if the tool has a tool body, false otherwise
     */
    hasToolBody() {
        return this.toolBodyElement !== undefined;
    }

    /**
     * Adds a tool body to the tool element.
     * If the tool already has a tool body and override is not set to true,
     * the addition is canceled.
     *
     * @param {ToolBody} toolBodyElement - The ToolBody element to be added.
     * @param {boolean} override - A flag indicating whether to override an existing tool body. [Defaults to false].
     * @returns {boolean} True if the tool body was added successfully, false otherwise.
     */
    addToolBody(toolBodyElement, override = false) {
        const add = (toolBodyElement) => {
            if (!toolBodyElement || !toolBodyElement instanceof ToolBody) {
                this.toolBodyElement = undefined;

                console.log(`[tool.js] - ${this.name}:`);
                console.log("Failed to add tool body to the tool.");
                console.log("Error Message: Tool body is not an instance of ToolBody.");
                return false;
            } else {
                this.toolBodyElement = toolBodyElement;
                this.element.appendChild(this.toolBodyElement);

                const linkToolCSS = document.createElement("link");
                linkToolCSS.rel = "stylesheet";
                linkToolCSS.href = "./styles/tools/size.css";
                document.head.appendChild(linkToolCSS);

                console.log(
                    `[tool.js] - ${this.name}: Created and added tool body to the tool successfully.`
                );
                return true;
            }
        };

        try {
            if (override) {
                add(toolBodyElement);
            } else {
                if (this.hasToolBody()) {
                    console.log(
                        `[tool.js] - ${this.name}: Tool body already exists for the tool - Canceling...`
                    );
                    return false;
                }

                add(toolBodyElement);
            }
        } catch (err) {
            console.log(`[tool.js] - ${this.name}:`);
            console.log("Failed to add tool body to the tool.");
            console.log(`Error Message:\n${err}`);
            return false;
        }
    }

    /**
     * Removes the tool body from the tool if it exists.
     * If the tool does not have a tool body, the method does nothing.
     * @returns {boolean} True if the tool body was removed successfully, false otherwise.
     */
    removeToolBody() {
        if (this.hasToolBody()) {
            this.element.removeChild(this.toolBodyElement);
            this.toolBodyElement = undefined;
            console.log(`[tool.js] - ${this.name}: Removed tool body from the tool successfully.`);
            return true;
        }
        return false;
    }

    /**
     * The method adds the tool to the given parent element.
     * If no parent element provided defaults to adding the tool's
     * element to the document body.
     * @param {HTMLElement} parentElement
     */
    addTo(parentElement = document.body) {
        // Checking if parentElement parameter is of type HTMLElement.
        if (parentElement instanceof HTMLElement) {
            parentElement.appendChild(this.element);
        }
    }

    /**
     * Adds the tool to the document body.
     *
     * @deprecated Use addTo() method instead.
     */
    addToDocumentBody() {
        document.body.appendChild(this.element);
    }

    /**
     * Removes the tool's element from the document body.
     * If the tool is not in the document body, the method does nothing.
     */
    removeFromDocumentBody() {
        document.body.removeChild(this.element);
    }
}
