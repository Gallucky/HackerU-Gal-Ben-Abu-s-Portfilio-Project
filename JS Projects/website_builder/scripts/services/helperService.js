import { DraggableElement } from "../classes/draggableElements/DraggableElements.js";
import { Tool } from "../classes/Tool.js";
import { ToolType } from "../classes/ToolType.js";

const dynamicLinkedCSSFiles = [];

const alreadyLinked = (link) => {
    return dynamicLinkedCSSFiles.some((id) => {
        return id === `link-css-${link}`;
    });
};

export const linkCSSToHTML = (link) => {
    try {
        if (alreadyLinked(link)) {
            throw new Error(`${link} CSS file is already linked.`);
        }

        const linkCSS = document.createElement("link");
        linkCSS.rel = "stylesheet";
        linkCSS.href = link;
        linkCSS.id = `link-css-${link}`;
        dynamicLinkedCSSFiles.push(linkCSS.id);

        document.head.appendChild(linkCSS);
    } catch (err) {
        const msg = `%cLinking ${link} CSS failed.\n` + `Error Message:\n` + err;
        console.log(msg, "color: red;");
        return false;
    } finally {
        const msg = `%c${link} CSS linked successfully.`;
        console.log(msg, "color: green;");
        return true;
    }
};

export const populateToolBox = (toolBoxToPopulate) => {
    if (!toolBoxToPopulate) {
        throw new Error("No tool box to populate.");
    }

    // Creating the tools.
    const elementTypeTool = createElementTypeTool();

    // Adding the tools to the tool box.
    toolBoxToPopulate.addTool(elementTypeTool);
};

const createElementTypeTool = () => {
    const elementType = new Tool(
        "Element Type",
        ToolType.select,
        "The type / tag of the created element."
    );
    console.log(elementType.element.id);

    let label = document.createElement("label");
    label.for = "type-selection";
    label.textContent = "Type:";

    elementType.element.appendChild(label);

    let select = document.createElement("select");
    select.name = "type-selection";
    select.id = "type-selection";

    populateSelectElementWith(select, DraggableElement.subclasses, "Select Type...");

    elementType.element.appendChild(select);

    return elementType;
};

const populateSelectElementWith = (select, options, defaultSelectedOption = undefined) => {
    if (defaultSelectedOption) {
        const defaultOption = document.createElement("option");
        defaultOption.value = defaultSelectedOption;
        defaultOption.textContent = defaultSelectedOption;
        defaultOption.selected = true;
        defaultOption.disabled = true;

        select.appendChild(defaultOption);
    }

    options.forEach((option) => {
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;

        select.appendChild(optionElement);
        console.log(`Added ${option} to the select element.`);
    });
};
