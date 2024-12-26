import { createDraggableElement } from "./drag.js";
import { changeValuesBelowMinimumLimitListener } from "./general_listeners.js";
import { populateFontFamilySelectionOptions } from "./supported_font_families.js";

// Giving access to the createDraggableElement function globally.
window.createDraggableElement = createDraggableElement;

// Testing the drag idea.
const workspace = document.getElementById("workspace");

const testerDiv = document.getElementById("example-test-div");

// Applying event listener if the user changes
// the value of the size input below the minimum value,
// to the size inputs.
const newElementSizeWidthInput = document.getElementById("width-input");
const newElementSizeHeightInput = document.getElementById("height-input");

newElementSizeWidthInput.onchange = changeValuesBelowMinimumLimitListener;
newElementSizeHeightInput.onchange = changeValuesBelowMinimumLimitListener;

const selectionFontFamily = document.getElementById("font-family-selection");
populateFontFamilySelectionOptions(selectionFontFamily);
