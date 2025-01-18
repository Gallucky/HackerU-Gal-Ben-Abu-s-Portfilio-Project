import { Header } from "../classes/draggableElements/Header.js";
import { Span } from "../classes/draggableElements/Span.js";
import { P } from "../classes/draggableElements/P.js";
import { Div } from "../classes/draggableElements/Div.js";
import { DraggableElement } from "../classes/draggableElements/DraggableElements.js";
import { Image } from "../classes/draggableElements/Image.js";
import { A as A } from "../classes/draggableElements/A.js";

/**
 * Populate a select element with options.
 * @param {HTMLSelectElement} select The select element to populate.
 * @param {string[]} options The options to populate the select element with.
 * @param {...*} [args] Additional arguments to pass to the function.
 * @param {string} [defaultSelectedOption] The default selected option. If not provided, the first option will be selected.
 * @param {boolean} [optionIsValidFontNames] Whether the options are valid font names. If true, the font names will be applied to the options.
 * @param {function} [func] The function to run when the select element changes. The function will receive the change event as an argument.
 */
export const populateSelectElementWith = (
    select,
    options,
    // defaultSelectedOption = undefined,
    // optionIsValidFontNames = false,
    ...args
) => {
    // Setting default values for the arguments.
    let defaultSelectedOption = undefined;
    let optionIsValidFontNames = false;
    let func = () => {};

    // Extracting the arguments.
    args.forEach((arg) => {
        if (typeof arg === "string") {
            defaultSelectedOption = arg;
        }
        if (typeof arg === "boolean") {
            optionIsValidFontNames = arg;
        }
        if (typeof arg === "function") {
            func = arg;
        }
    });

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

    // Adding a change listener for the select that will make
    // sure that the selected option will have the selected property.
    select.addEventListener("change", (e) => {
        Array.from(select.options).forEach((option) => {
            option.selected = option === select.options[select.selectedIndex];

            if (option.selected) {
                option.classList.add("selected");
            } else {
                option.classList.remove("selected");
            }

            // console.log(
            //     `Option ${option.value} is ${option.selected ? "selected" : "not selected"}`
            // );
        });

        console.log("select option changed.");

        // Running the onchange function provided in the args parameter array.
        func(e);
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
    Image.initialize();
    A.initialize();

    // Sorting the subclasses in alphabetical order.
    DraggableElement.sortSubclasses();
};

export const applyRedBorderToElement = (element) => {
    const oldBorder = element.style.border;
    element.style.border = "2px solid red";

    setTimeout(() => {
        element.style.border = oldBorder;
    }, 2000);
};
