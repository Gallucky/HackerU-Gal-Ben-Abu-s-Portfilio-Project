import { createDraggableElement } from "./drag.js";
import { changeValuesListenerAndHandler } from "./general_listeners.js";
import {
    populateFontFamilySelectionOptions,
    getFontFamilySelectionOnValueChangeListenerHandler,
} from "./supported_font_families.js";

// Giving access to the createDraggableElement function globally.
window.createDraggableElement = createDraggableElement;

// Testing the drag idea.
const workspace = document.getElementById("workspace");
window.onresize = () => {
    console.log(`Workspace Resized To: ${workspace.clientWidth}px, ${workspace.clientHeight}px`);
};
console.log(`
Workspace Width: ${workspace.clientWidth}px
Workspace Height: ${workspace.clientHeight}px

Max Element Width: ${workspace.clientWidth * 0.9}px
Max Element Height: ${workspace.clientHeight * 0.9}px
`);

const testerDiv = document.getElementById("example-test-div");

// Applying event listener if the user changes
// the value of the size input below the minimum value,
// to the size inputs.
const newElementSizeWidthInput = document.getElementById("width-input");
const newElementSizeHeightInput = document.getElementById("height-input");

newElementSizeWidthInput.onchange = (e) => changeValuesListenerAndHandler(e, "width");
newElementSizeHeightInput.onchange = (e) => changeValuesListenerAndHandler(e, "height");

const selectionFontFamily = document.getElementById("font-family-selection");
selectionFontFamily.style.fontFamily = "Rubik";
populateFontFamilySelectionOptions(selectionFontFamily);
getFontFamilySelectionOnValueChangeListenerHandler(selectionFontFamily);
