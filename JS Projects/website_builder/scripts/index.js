import { ToolType } from "./classes/ToolType.js";
import { Tool } from "./classes/Tool.js";
import { ToolBox } from "./classes/ToolBox.js";

// This toolbox is used to store all the
// tools in the tools panel.
// const toolBox = new ToolBox();

const tool = new Tool("test tool", ToolType.input, "this is a test tool");
const tool2 = new Tool("test tool", ToolType.input);

const label = document.createElement("label");
label.textContent = "Tool 1:";
tool.element.appendChild(label);

console.log(tool);
console.log(tool2);

const toolBox = new ToolBox();

toolBox.addTool(tool);
toolBox.addTool(tool2);

console.log(toolBox.tools);
console.log(toolBox);

toolBox.addToolsToToolPanel();
