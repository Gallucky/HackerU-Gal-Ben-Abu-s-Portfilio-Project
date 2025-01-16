import { Header } from "../classes/draggableElements/Header.js";
import { Span } from "../classes/draggableElements/Span.js";
import { P } from "../classes/draggableElements/P.js";
import { Div } from "../classes/draggableElements/Div.js";

export const populateSelectElementWith = (
    select,
    options,
    defaultSelectedOption = undefined,
    optionIsValidFontNames = false
) => {
    if (defaultSelectedOption) {
        const defaultOption = document.createElement("option");
        defaultOption.value = defaultSelectedOption;
        defaultOption.textContent = defaultSelectedOption;
        defaultOption.selected = true;
        defaultOption.disabled = true;

        select.appendChild(defaultOption);
    }

    if (!optionIsValidFontNames) {
        optionIsValidFontNames = false;
    } else {
        console.warn(
            `[elementService.js] - populateSelectElementWith: Options received are not valid font names.`
        );
    }

    options.forEach((option) => {
        let optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;

        if (optionIsValidFontNames) {
            optionElement.style.fontFamily = option;
        }

        select.appendChild(optionElement);
        console.log(`Added ${option} to the select element.`);
    });
};

export const createInformationButton = (informationText) => {
    const informationButton = document.createElement("div");
    informationButton.classList.add("info-btn");
    informationButton.style.setProperty("--pseudo-after-text", `"${informationText}"`);

    return informationButton;
};

export const initializeSupportedElementTypes = () => {
    // Creating a temp objects for all the supported element types,
    // so the DraggableElement.#subclasses set can be populated by the
    // constructor and thus populating the element type tool selection options.
    Header.initializeHeaders();
    Div.initialize();
    P.initialize();
    Span.initialize();
};
