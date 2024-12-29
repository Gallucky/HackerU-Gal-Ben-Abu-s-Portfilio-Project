// General event listeners will be located and defined here.

// If the user changes the value of the size input below the minimum value.
const changeValuesBelowMinimumLimitListener = (e) => {
    if (e.target.value < 50) {
        e.target.value = 50;
        const backupBorder = e.target.style.border;
        e.target.style.border = "2px solid red";
        setTimeout(() => {
            e.target.style.border = backupBorder;
        }, 1000);
    }
};

const changeValuesAboveMaximumLimitListener = (e, type) => {
    const workspace = document.getElementById("workspace");
    // I don't use the e.target.parent because currently the element
    // is the input element and not the draggable element soon to be created.

    const maxWidth = workspace.clientWidth * 0.9;
    const maxHeight = workspace.clientHeight * 0.9;

    if (type.toLowerCase() === "width" && e.target.value > maxWidth) {
        e.target.value = Math.round(maxWidth);
    } else if (type.toLowerCase() === "height" && e.target.value > maxHeight) {
        e.target.value = Math.round(maxHeight);
    }
};

const changeValuesListenerAndHandler = (e, type, parent) => {
    changeValuesBelowMinimumLimitListener(e);
    changeValuesAboveMaximumLimitListener(e, type, parent);
};

export { changeValuesListenerAndHandler };
