import { Tool } from "./classes/tool.js";
import { ToolBody } from "./classes/toolBody.js";
import { ToolBox } from "./classes/toolBox.js";

/**
 * @deprecated
 */
const firstTest = () => {
    const tool = new Tool("Test Tool", "This is a test tool.");

    console.log(tool);
    console.log(tool.hasLabel());
    console.log(tool.hasToolBody());

    tool.addLabel("custom-id", "Custom Text");
    console.log(tool);
    console.log(tool.hasLabel());
    tool.addLabel("custom-id", "Custom Text");
    console.log(tool.labelElement);

    console.log("Tool has tool body:", tool.hasToolBody() ? "Yes" : "No");

    console.log("ToolBody.sizeElement:", ToolBody.sizeElement);
    console.log("Type of ToolBody.sizeElement:", typeof ToolBody.sizeElement);
    console.log(
        "ToolBody.sizeElement instanceof ToolBody:",
        ToolBody.sizeElement instanceof ToolBody
    );

    tool.addToolBody(ToolBody.sizeElement);

    console.log("Tool has tool body:", tool.hasToolBody() ? "Yes" : "No");

    console.log("ToolBody.inputElement:", ToolBody.inputElement);
    console.log("Type of ToolBody.inputElement:", typeof ToolBody.inputElement);
    console.log(
        "ToolBody.inputElement instanceof ToolBody:",
        ToolBody.inputElement instanceof ToolBody
    );

    console.log(tool);
};

// firstTest();

const secondTest = () => {
    const elementType = new Tool("element-type", "The type of the created element tool");
    const elementName = new Tool("element-name", "The name of the created element tool");
    const elementSize = new Tool("element-size", "The type of the created element tool");
    const elementText = new Tool("element-text", "The text of the created element tool");
    const elementBgColor = new Tool(
        "element-bg-color",
        "The background color of the created element tool"
    );
    const elementFontColor = new Tool(
        "element-font-color",
        "The font color of the created element tool"
    );
    const elementFontSize = new Tool(
        "element-font-size",
        "The font size of the created element tool"
    );
    const elementFontFamily = new Tool(
        "element-font-family",
        "The font family of the created element tool"
    );

    // Type:
    elementType.addLabel("Type:");
    elementType.addToolBody(ToolBody.selectElement());
    elementType.addTo();
    console.log(elementType);

    // Name:
    elementName.addLabel("Name:");
    elementName.addToolBody(ToolBody.inputElement());
    elementName.addTo();
    console.log(elementName);

    // Size:
    elementSize.addLabel("Size:");
    elementSize.labelElement.style.textDecoration = "underline";
    elementSize.labelElement.style.textUnderlineOffset = "0.2em";
    elementSize.addToolBody(ToolBody.sizeElement());
    elementSize.addTo();
    console.log(elementSize);

    // Text Area:
    elementText.addLabel("Text:");
    elementText.addToolBody(ToolBody.textAreaElement());
    elementText.addTo();
    console.log(elementText);

    // Background Color:
    elementBgColor.addLabel("Background Color:");
    elementBgColor.addToolBody(ToolBody.colorElement());
    elementBgColor.addTo();
    console.log(elementBgColor);

    // Font Color:
    elementFontColor.addLabel("Font Color:");
    elementFontColor.addToolBody(ToolBody.colorElement());
    elementFontColor.addTo();
    console.log(elementFontColor);

    // Font Size:
    elementFontSize.addLabel("Font Size:");
    elementFontSize.addToolBody(ToolBody.inputElement());
    elementFontSize.addTo();
    console.log(elementFontSize);

    // Font Family:
    elementFontFamily.addLabel("Font Family:");
    elementFontFamily.addToolBody(ToolBody.selectElement());
    elementFontFamily.addTo();
    console.log(elementFontFamily);
};

// secondTest();

const thirdTest = () => {
    const toolBox = new ToolBox();

    const elementType = new Tool("element-type", "The type of the created element tool");
    const elementName = new Tool("element-name", "The name of the created element tool");
    const elementSize = new Tool("element-size", "The type of the created element tool");
    const elementText = new Tool("element-text", "The text of the created element tool");
    const elementBgColor = new Tool(
        "element-bg-color",
        "The background color of the created element tool"
    );
    const elementFontColor = new Tool(
        "element-font-color",
        "The font color of the created element tool"
    );
    const elementFontSize = new Tool(
        "element-font-size",
        "The font size of the created element tool"
    );
    const elementFontFamily = new Tool(
        "element-font-family",
        "The font family of the created element tool"
    );

    toolBox.addTool(elementType);
    toolBox.addTool(elementName);
    toolBox.addTool(elementSize);
    toolBox.addTool(elementText);
    toolBox.addTool(elementBgColor);
    toolBox.addTool(elementFontColor);
    toolBox.addTool(elementFontSize);
    toolBox.addTool(elementFontFamily);

    console.log(toolBox);

    elementBgColor.addLabel("Background Color:");
    elementBgColor.addToolBody(ToolBody.colorElement());
    elementBgColor.addTo();

    console.log(toolBox);
};

thirdTest();
