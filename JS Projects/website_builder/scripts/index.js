import { ToolType } from "./classes/ToolType.js";
import { Tool } from "./classes/tool.js";
import { ToolBody } from "./classes/toolBody.js";

// This toolbox is used to store all the
// tools in the tools panel.
// const toolBox = new ToolBox();

const tool = new Tool("Tool", "Description");
tool.addToolBody(ToolBody.input);

console.log(tool.getDescription());
console.log(tool.getName());
console.log(tool.getElement());
console.log(tool.getToolType());
