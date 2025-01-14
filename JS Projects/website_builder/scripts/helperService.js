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

    const elementText = new Tool("element-text", "The text of the created element.");
    elementText.addLabel("Text:");
    elementText.addToolBody(ToolBody.textAreaElement());

    const elementSize = new Tool("element-size", "The size of the created element.");
    elementSize.addLabel("Size:");
    elementSize.addToolBody(ToolBody.sizeElement());

    const elementBgColor = new Tool(
        "element-bg-color",
        "The background color of the created element."
    );
    elementBgColor.addLabel("Background Color:");
    elementBgColor.addToolBody(ToolBody.colorElement());

    const elementTextColor = new Tool("element-color", "The color of the created element.");
    elementTextColor.addLabel("Text Color:");
    elementTextColor.addToolBody(ToolBody.colorElement());

    const elementFontSize = new Tool("element-font-size", "The font size of the created element.");
    elementFontSize.addLabel("Font Size:");
    elementFontSize.addToolBody(ToolBody.inputElement());

    const elementFontFamily = new Tool(
        "element-font-family",
        "The font family of the created element."
    );
    elementFontFamily.addLabel("Font Family:");
    elementFontFamily.addToolBody(ToolBody.selectElement());

    ToolBox.addTool(elementType);
    ToolBox.addTool(elementName);
    ToolBox.addTool(elementText);
    ToolBox.addTool(elementSize);
    ToolBox.addTool(elementBgColor);
    ToolBox.addTool(elementTextColor);
    ToolBox.addTool(elementFontSize);
    ToolBox.addTool(elementFontFamily);
};

export const populateSupportedTypes = (tool) => {
    const toolType = tool.getToolBodyType();
};
