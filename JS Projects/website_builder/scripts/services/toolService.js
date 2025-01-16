import {
    populateSelectElementWith,
    createInformationButton,
    initializeSupportedElementTypes,
} from "./elementService.js";
import { Tool } from "../classes/Tool.js";
import { ToolType } from "../classes/ToolType.js";
import { DraggableElement } from "../classes/draggableElements/DraggableElements.js";
import { getSupportedFontsNames } from "./supportedFontsService.js";

export const createElementTypeTool = () => {
    const elementType = new Tool(
        "Element Type",
        ToolType.select,
        "The type / tag of the created element."
    );
    console.log(elementType.element.id);

    const label = document.createElement("label");
    label.for = "type-selection";
    label.textContent = "Type:";

    const select = document.createElement("select");
    select.name = "type-selection";
    select.id = "type-selection";

    initializeSupportedElementTypes();

    select.setAttribute("default-value", true);
    select.onchange = (e) => {
        select.setAttribute("default-value", false);
    };

    // Populating the select element with the supported element types.
    populateSelectElementWith(select, DraggableElement.subclasses, "Select Type...");

    // Adding the child elements.
    elementType.element.appendChild(label);
    elementType.element.appendChild(select);

    return elementType;
};

export const createElementNameTool = () => {
    const elementNameTool = new Tool(
        "Element Name",
        ToolType.input,
        "The name of the created element."
    );

    const label = document.createElement("label");
    label.for = "input-element-name";
    label.textContent = "Name:";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "input-element-name";
    input.id = "input-element-name";

    const information = createInformationButton("Explanatory text...");
    information.id = "element-name-information";

    // Adding the child elements.
    elementNameTool.element.appendChild(label);
    elementNameTool.element.appendChild(input);
    elementNameTool.element.appendChild(information);

    return elementNameTool;
};

export const createElementTextTool = () => {
    const elementTextTool = new Tool(
        "Element Text",
        ToolType.textArea,
        "The text of the created element."
    );

    const label = document.createElement("label");
    label.for = "textarea-element-text";
    label.textContent = "Text:";

    const textarea = document.createElement("textarea");
    textarea.name = "textarea-element-text";
    textarea.id = "textarea-element-text";
    textarea.classList.add("text-area-element");

    // Adding the child elements.
    elementTextTool.element.appendChild(label);
    elementTextTool.element.appendChild(textarea);

    return elementTextTool;
};

export const createElementSizeTool = () => {
    const elementSizeTool = new Tool(
        "Element Size",
        ToolType.size,
        "The size of the created element."
    );

    const label = document.createElement("label");
    label.id = "element-size-label";
    label.textContent = "Size:";

    const outerWrapper = document.createElement("div");
    outerWrapper.classList.add("outer-wrapper");

    const separator = document.createElement("span");
    separator.classList.add("separator");
    separator.textContent = "x";

    const widthArea = document.createElement("div");
    widthArea.classList.add("width-area");

    const widthLabel = document.createElement("label");
    widthLabel.for = "width-input";
    widthLabel.textContent = "Width:";

    const horizontalWidthWrapper = document.createElement("div");
    horizontalWidthWrapper.classList.add("horizontal-wrapper2");

    const widthInput = document.createElement("input");
    widthInput.id = "width-input";
    widthInput.name = "width-input";
    widthInput.type = "number";
    widthInput.min = "50";
    widthInput.value = "100";
    widthInput.step = "1";

    /**
     * Ensures that the width input's value is between 50 and 90% of the window's inner width.
     * If the value is less than 50, it is set to 50.
     * If the value is greater than 90% of the window's inner width, it is set to 90% of the window's inner width.
     * @param {InputEvent} e
     */
    widthInput.onchange = (e) => {
        console.log(window.innerWidth);

        if (widthInput.value < 50) widthInput.value = 50;
        if (widthInput.value > window.innerWidth * 0.9) {
            widthInput.value = +(window.innerWidth * 0.9).toString().split(".")[0];
        }
    };

    const widthUnit = document.createElement("span");
    widthUnit.classList.add("unit");
    widthUnit.textContent = "px";

    horizontalWidthWrapper.appendChild(widthInput);
    horizontalWidthWrapper.appendChild(widthUnit);

    widthArea.appendChild(widthLabel);
    widthArea.appendChild(horizontalWidthWrapper);

    const heightArea = document.createElement("div");
    heightArea.classList.add("height-area");

    const heightLabel = document.createElement("label");
    heightLabel.for = "height-input";
    heightLabel.textContent = "Height:";

    const horizontalHeightWrapper = document.createElement("div");
    horizontalHeightWrapper.classList.add("horizontal-wrapper2");

    const heightInput = document.createElement("input");
    heightInput.id = "height-input";
    heightInput.name = "height-input";
    heightInput.type = "number";
    heightInput.min = "50";
    heightInput.value = "100";
    heightInput.step = "1";

    /**
     * onchange event handler of the height input element.
     * If the given height in the input element is less than 50, it is set to 50.
     * If the given height is greater than 90% of the window.innerHeight, it is
     * set to the 90% of the window.innerHeight.
     * @param {Event} e the onchange event
     */
    heightInput.onchange = (e) => {
        console.log(window.innerHeight);

        if (heightInput.value < 50) heightInput.value = 50;
        if (heightInput.value > window.innerHeight * 0.9) {
            heightInput.value = +(window.innerHeight * 0.9).toString().split(".")[0];
        }
    };

    const heightUnit = document.createElement("span");
    heightUnit.classList.add("unit");
    heightUnit.textContent = "px";

    horizontalHeightWrapper.appendChild(heightInput);
    horizontalHeightWrapper.appendChild(heightUnit);

    heightArea.appendChild(heightLabel);
    heightArea.appendChild(horizontalHeightWrapper);

    outerWrapper.appendChild(widthArea);
    outerWrapper.appendChild(separator);
    outerWrapper.appendChild(heightArea);

    // Adding the child elements.
    elementSizeTool.element.appendChild(label);
    elementSizeTool.element.appendChild(outerWrapper);

    return elementSizeTool;
};

export const createElementBgColorTool = () => {
    const elementBgColorTool = new Tool(
        "Element Background Color",
        ToolType.color,
        "The background color of the created element."
    );

    const label = document.createElement("label");
    label.for = "bg-color-input";
    label.textContent = "Background Color:";

    const input = document.createElement("input");
    input.id = "bg-color-input";
    input.name = "bg-color-input";
    input.type = "color";
    input.value = "#ffffff";
    input.classList.add("color-input");

    // Adding the child elements.
    elementBgColorTool.element.appendChild(label);
    elementBgColorTool.element.appendChild(input);

    return elementBgColorTool;
};

export const createElementFontColorTool = () => {
    const elementFontColorTool = new Tool(
        "Element Font Color",
        ToolType.color,
        "The font color of the created element."
    );

    const label = document.createElement("label");
    label.for = "font-color-input";
    label.textContent = "Font Color:";

    const input = document.createElement("input");
    input.id = "font-color-input";
    input.name = "font-color-input";
    input.type = "color";
    input.value = "#000000";
    input.classList.add("color-input");

    // Adding the child elements.
    elementFontColorTool.element.appendChild(label);
    elementFontColorTool.element.appendChild(input);

    return elementFontColorTool;
};

export const createElementFontSizeTool = () => {
    const elementFontSizeTool = new Tool(
        "Element Font Size",
        ToolType.size,
        "The font size of the created element."
    );

    const label = document.createElement("label");
    label.for = "font-size-input";
    label.textContent = "Font Size:";

    const horizontalWrapper = document.createElement("div");
    horizontalWrapper.classList.add("horizontal-wrapper");

    const input = document.createElement("input");
    input.id = "font-size-input";
    input.name = "font-size-input";
    input.type = "number";
    input.step = "1";
    input.value = "16";
    input.min = "1";

    const unit = document.createElement("span");
    unit.classList.add("unit");
    unit.textContent = "px";

    horizontalWrapper.appendChild(input);
    horizontalWrapper.appendChild(unit);

    // Adding the child elements.
    elementFontSizeTool.element.appendChild(label);
    elementFontSizeTool.element.appendChild(horizontalWrapper);

    return elementFontSizeTool;
};

export const createElementFontFamilyTool = () => {
    const elementFontFamilyTool = new Tool(
        "Element Font Family",
        ToolType.select,
        "The font family of the created element."
    );

    const label = document.createElement("label");
    label.for = "font-family-selection";
    label.textContent = "Font Family:";

    const select = document.createElement("select");
    select.name = "font-family-selection";
    select.id = "font-family-selection";

    const supportedFontNames = getSupportedFontsNames();
    console.log("fontNames:", supportedFontNames);

    select.onchange = (e) => {
        select.setAttribute("default-value", false);
    };
    // Populating the select element with the supported font names.
    populateSelectElementWith(select, supportedFontNames, "Select Font Family...", true);

    select.onchange = (e) => {
        e.target.style.fontFamily = e.target.value;
    };

    // Adding the child elements.
    elementFontFamilyTool.element.appendChild(label);
    elementFontFamilyTool.element.appendChild(select);

    return elementFontFamilyTool;
};
