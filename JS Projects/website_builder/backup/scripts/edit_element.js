export const editCreatedDraggableElements = () => {
    const draggableElements = document.querySelectorAll("[data-draggable]");

    draggableElements.forEach((element) => {
        editCreatedDraggableElement(element);
    });
};

export const editCreatedDraggableElement = (element) => {
    element.addEventListener("click", () => {
        // Firstly save the tools panel current data to restore later.
        const currentToolsPanelData = document.querySelector(".tools-panel").innerHTML;

        console.log("User clicked on element: " + element.id);

        console.log("Loading clicked element's data to the tools panel to view/edit.");

        // Clicked created draggable element's data.
        const elementWidth = element.clientWidth;
        const elementHeight = element.clientHeight;

        const elementName = element.id;
        const elementType = element.tagName.toLowerCase();

        const elementText = element.innerText;
        const elementBgColor = window.getComputedStyle(element).backgroundColor;
        const elementTextColor = window.getComputedStyle(element).color;
        const elementFontSize = parseFloat(element.style.fontSize);
        const elementFontFamily = window.getComputedStyle(element).fontFamily;

        console.log("Clicked element's data:");
        console.log("Element Width: " + elementWidth + "px");
        console.log("Element Height: " + elementHeight + "px");
        console.log("Element Name: " + elementName);
        console.log("Element Type: " + elementType);
        console.log("Element Text: " + elementText);
        console.log("Element Background Color: [" + typeof elementBgColor + "] " + elementBgColor);
        console.log("Element Text Color: [" + typeof elementTextColor + "] " + elementTextColor);
        console.log("Element Font Size: [" + typeof elementFontSize + "] " + elementFontSize);
        console.log("Element Font Family: [" + typeof elementFontFamily + "] " + elementFontFamily);

        console.log(window.getComputedStyle(element).color);

        // Getting the tools elements.
        const type = document.querySelector("#element-type #selection");
        const name = document.querySelector("#element-name #name");
        const width = document.getElementById("width-input");
        const height = document.getElementById("height-input");

        const text = document.querySelector("#element-text #text");
        const color = document.querySelector("#element-bg-color #color");
        const fontColor = document.querySelector("#element-font-color #font-color-input");
        const fontSize = document.querySelector("#element-font-size #font-size-input");
        const fontFamily = document.getElementById("font-family-selection");

        // Filling the tools elements with the clicked element's data.
        type.value = elementType;
        name.value = elementName;
        width.value = elementWidth;
        height.value = elementHeight;
        text.value = elementText;
        color.value = elementBgColor;
        fontColor.value = elementTextColor;
        fontSize.value = elementFontSize;
        fontFamily.value = elementFontFamily;

        // For restoring to the original state the save button
        // will change to the cancel edit button and it will
        // restore and revert the tools panel to its original state.
        // Another way is for clicking other elements to edit them or
        // to click the workspace element to go back to the saved state.
    });
};
