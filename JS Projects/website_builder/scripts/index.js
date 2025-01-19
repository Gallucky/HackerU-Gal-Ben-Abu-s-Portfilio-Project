import { ToolType } from "./classes/ToolType.js";
import { Tool } from "./classes/Tool.js";
import { ToolBox } from "./classes/ToolBox.js";
import { populateToolBox } from "./services/helperService.js";
import { DraggableElement } from "./classes/draggableElements/DraggableElements.js";
import {
    actionButtonCreateOnClickHandler,
    actionButtonSaveOnClickHandler,
} from "./services/actionButtonsService.js";
import { loadDraggableElementsFromLocalStorage } from "./services/storageService.js";
import { updateDraggableElements } from "./services/dragService.js";
import { addDraggableElementsFromLocalStorageToDOM } from "./services/elementService.js";

loadDraggableElementsFromLocalStorage();
addDraggableElementsFromLocalStorageToDOM();

updateDraggableElements();

// This toolbox is used to store all the
// tools in the tools panel.
const toolBox = new ToolBox();

populateToolBox(toolBox);

toolBox.addToolsToToolPanel();

console.log(toolBox.tools);

actionButtonCreateOnClickHandler(toolBox);
actionButtonSaveOnClickHandler();
