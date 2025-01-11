import { ToolBody } from "./toolBody.js";

export class Tool {
    name;
    description;
    labelElement;
    toolBodyElement;
    element;

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

    hasLabel() {
        return this.labelElement !== undefined;
    }

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

    removeLabel() {
        if (this.hasLabel()) {
            this.element.removeChild(this.labelElement);
            this.labelElement = undefined;
            console.log(`[tool.js] - ${this.name}: Removed label from the tool successfully.`);
            return true;
        }
        return false;
    }

    hasToolBody() {
        return this.toolBodyElement !== undefined;
    }

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

    addToDocumentBody() {
        document.body.appendChild(this.element);
    }

    removeFromDocumentBody() {
        document.body.removeChild(this.element);
    }
}
