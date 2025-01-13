import { Tool } from "./classes/tool.js";
import { ToolBody } from "./classes/toolBody.js";
import { ToolBox } from "./classes/toolBox.js";

export const populateToolBox = (ToolBox) => {
    // Creating the tools.

    const elementType = new Tool("element-type", "The type / tag of the element to create.");
    elementType.addLabel("Type:");
    elementType.addToolBody(ToolBody.selectElement());

    const elementName = new Tool("element-name", "The name / id of the created element.");
    elementName.addLabel("Name:");
    elementName.addToolBody(ToolBody.inputElement());

    const infoBtn = document.createElement("button");
    infoBtn.className = "info-btn";

    elementName.element.appendChild(infoBtn);
};
