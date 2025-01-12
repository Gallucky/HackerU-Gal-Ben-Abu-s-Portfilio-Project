import { Tool } from "./classes/tool.js";
import { ToolBody } from "./classes/toolBody.js";

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
    const elementSize = new Tool("element-type", "The type of the created element tool");

    elementSize.addLabel("Size:");
    elementSize.labelElement.style.textDecoration = "underline";
    elementSize.labelElement.style. = "0.2em";
    elementSize.addToolBody(ToolBody.sizeElement);
    elementSize.addTo();

    console.log(elementSize);

    const elementName = new Tool("element-name", "The name of the created element tool");

    elementName.addLabel("Name:");
    elementName.addToolBody(ToolBody.inputElement);

    elementName.addTo();
};

secondTest();
