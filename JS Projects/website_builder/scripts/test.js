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
    const elementType = new Tool("element-type", "The type of the created element tool");

    elementType.addLabel("Size");
    elementType.addToolBody(ToolBody.sizeElement);

    elementType.addTo();
    console.log(elementType);
};

secondTest();
