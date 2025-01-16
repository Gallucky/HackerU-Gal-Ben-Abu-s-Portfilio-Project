import { ToolBox } from "../classes/ToolBox.js";
import { applyRedBorderToElement } from "../services/elementService.js";

/**
 * Creates an onclick event handler for the "Create" action button.
 * This function will get the selected tool from the provided toolBox and
 * create a new draggable element using the selected tool's type.
 * @param {ToolBox} toolBox - The tool box to get the selected tool from.
 * @returns {void} Returns nothing.
 */
export const actionButtonCreateOnClickHandler = (toolBox) => {
    const actionButtonCreate = document.getElementById("create-element-btn");

    actionButtonCreate.onclick = () => {
        const type = toolBox.getTool(1);
        const fontFamily = toolBox.getTool(8);

        if (validateAndHighlightInputValues(type, fontFamily)) {
        }
    };
};

const validateAndHighlightInputValues = (type, fontFamily) => {
    if (!type || !fontFamily) {
        throw new Error("One of the following parameters is not defined: type, size, fontFamily.");
    }

    const typeInput = type.element.querySelector("select");
    const fontFamilyInput = fontFamily.element.querySelector("select");

    if (!typeInput || !fontFamilyInput) {
        throw new Error(
            "One of the following parameters is not defined: typeInput, sizeWidthInput, sizeHeightInput, fontFamilyInput."
        );
    }

    let result = true;

    if (typeInput.getAttribute("default-value") === "true") {
        applyRedBorderToElement(typeInput);
        result = false;
    }

    if (fontFamilyInput.getAttribute("default-value") === "true") {
        applyRedBorderToElement(fontFamilyInput);
        result = false;
    }
};
