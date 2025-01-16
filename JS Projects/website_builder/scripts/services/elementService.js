export const populateSelectElementWith = (select, options, defaultSelectedOption = undefined) => {
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

        try {
            optionElement.style.fontFamily = option;
        } catch {
            console.warn(
                `[elementService.js] - populateSelectElementWith: ${option} is not a valid font name.`
            );
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
