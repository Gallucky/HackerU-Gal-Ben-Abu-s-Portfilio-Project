import { ToolBox } from "./classes/toolBox.js";
import { populateToolBox, populateSupportedTypes } from "./helperService.js";

// This toolbox is used to store all the
// tools in the tools panel.
const toolBox = new ToolBox();

populateToolBox(toolBox);

console.log(toolBox);

toolBox.addToolsToToolPanel();

const elementType = toolBox.getTool("element-type");

populateSupportedTypes(elementType);
