import { ToolType } from "./classes/ToolType.js";
import { Tool } from "./classes/Tool.js";
import { ToolBox } from "./classes/ToolBox.js";
import { populateToolBox } from "./services/helperService.js";

// This toolbox is used to store all the
// tools in the tools panel.
const toolBox = new ToolBox();

populateToolBox(toolBox);

toolBox.addToolsToToolPanel();
