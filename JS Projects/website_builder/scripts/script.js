// Testing the drag idea.

const workspace = document.getElementById("workspace");

const testerDiv = document.getElementById("example-test-div");

/*=============================================================================
// Chatting with claude helped fix and implement the onmouseup event problem that
// the element will stay in 'grab' mode....
// Key Notes:
// 1. Removing boolean flag to make sure the event listeners manage themselves.
// 2. Adding 'once: true' to the event listener to make sure it runs only once.
// 3. e.preventDefault() to prevent any default behaviors that might interfere while
//    dragging an element like selecting text.
// 4. Using window is more reliable than document because it is the document's parent
//    and is quicker.
// 5. Cleanup is simpler thus fewer possible bugs to occur / interferences.
=============================================================================*/

// Claude Chat Fix Explanation:
/*
Happy to explain the key changes that fixed the issue! Let me break down why it works now:

1. `{ once: true }` in the mouseup listener:
    - This is probably the most important fix
    - It tells the browser "only run this event listener one time, then automatically remove it"
    - In your original code, there might have been cases where the mouseup handler wasn't properly removed, leaving lingering event listeners

2. Using `window` instead of `document`:
    - `window` is the top-most object in the browser
    - This ensures we catch the mouse events even if the cursor moves very quickly or leaves the document area
    - It's more reliable for tracking mouse movements than `document`

3. Removing the `draggingElement` flag:
    - Instead of manually tracking state with a boolean, we're letting the event listeners themselves manage the state
    - If there's a mousemove listener, the element is being dragged
    - If there isn't, it's not being dragged
    - This eliminates potential state management bugs where the flag might get out of sync

4. `e.preventDefault()`:
    - This prevents any default browser behaviors that might interfere with the dragging
    - For example, it prevents text selection while dragging

5. The cleanup is more robust:
    - In `stopDragging`, we only need to remove the mousemove listener
    - The mouseup listener removes itself automatically thanks to `{ once: true }`
    - This simpler cleanup means fewer things can go wrong

Would you like me to explain any of these aspects in more detail?
*/
const dragElement = (element) => {
    let mouseXPos = 0;
    let mouseYPos = 0;
    let elementXPos = 0;
    let elementYPos = 0;

    const elementBorder = element.style.border;

    const moveElement = (e) => {
        mouseXPos = elementXPos - e.clientX;
        mouseYPos = elementYPos - e.clientY;
        elementXPos = e.clientX;
        elementYPos = e.clientY;

        const paddingForBorders = 4;

        const maxX = workspace.clientWidth - element.clientWidth - paddingForBorders;
        const maxY = workspace.clientHeight - element.clientHeight - paddingForBorders;

        // Preventing the element from going out of bounds
        if (element.offsetLeft - mouseXPos < 0) {
            element.style.left = "0px";

            console.log(
                `element's X position crossed the 0 boundary: ${element.offsetLeft - mouseXPos}`
            );
            removeEventListener("mousemove", moveElement);
        } else if (element.offsetLeft - mouseXPos > maxX) {
            element.style.left = `${maxX}px`;

            console.log(
                `element's X position crossed the maxX boundary:\n
                X: ${element.offsetLeft - mouseXPos}`
            );
            removeEventListener("mousemove", moveElement);
        } else {
            // Moving the element in the X axis.
            element.style.left = `${element.offsetLeft - mouseXPos}px`;
        }

        if (element.offsetTop - mouseYPos < 0) {
            element.style.top = "0px";

            console.log(
                `element's Y position crossed the 0 boundary: ${element.offsetLeft - mouseXPos}`
            );

            removeEventListener("mousemove", moveElement);
        } else if (element.offsetTop - mouseYPos > maxY) {
            element.style.top = `${maxY}px`;
            console.log(
                `element's Y position crossed the maxY boundary:\n
                Y: ${element.offsetTop + mouseYPos}`
            );
            removeEventListener("mousemove", moveElement);
        } else {
            // Moving the element in the Y axis.
            element.style.top = `${element.offsetTop - mouseYPos}px`;
        }

        console.log(
            `Dragging element: ${element.id}\nCurrent Position:\nX: ${element.style.left}, Y: ${element.style.top}`
        );
    };

    const startDragging = (e) => {
        e.preventDefault(); // Add this to prevent any default behaviors
        elementXPos = e.clientX;
        elementYPos = e.clientY;

        window.addEventListener("mousemove", moveElement); // Change to window
        window.addEventListener("mouseup", stopDragging, { once: true }); // Add once: true
        element.style.cursor = "grabbing";
        element.style.border = "3px groove teal";
    };

    const stopDragging = () => {
        window.removeEventListener("mousemove", moveElement);
        element.style.cursor = "grab";
        element.style.border = elementBorder;
    };

    // Initial setup
    element.style.cursor = "grab";
    element.style.position = "absolute"; // Ensure element is positioned
    element.addEventListener("mousedown", startDragging);
};

const updateDraggableElements = () => {
    const draggableElements = document.querySelectorAll("[data-draggable]");

    // Applying to every element that has the data-draggable attribute,
    // the dragging functionality.
    draggableElements.forEach((element) => {
        if (!element.dataset.appliedDragFunctionality) {
            element.dataset.appliedDragFunctionality = true;
            dragElement(element);
        }
    });
};

// Loading saved data from local storage.
updateDraggableElements();

// Implementing the create draggable element functionality.
const createDraggableElement = () => {
    const elementType = document.querySelector("#element-type #selection");
    const elementName = document.getElementById("name");
    const elementText = document.getElementById("text");
    const elementWidth = document.getElementById("width-input");
    const elementHeight = document.getElementById("height-input");
    const elementBgColor = document.getElementById("color");
    const elementTextColor = document.getElementById("font-color-input");
    const elementFontSize = document.getElementById("font-size-input");
    const elementFontFamily = document.getElementById("font-family-input");

    console.log(elementType);

    let requiredValuesEmpty = false;

    if (elementType.value == "") {
        console.log("Element type is empty");

        const elementTypeBorderBackup = elementType.style.border;
        elementType.style.border = "2px solid red";
        elementType.onchange = () => {
            // Restoring the border to its original state.
            elementType.style.border = elementTypeBorderBackup;
        };

        requiredValuesEmpty = true;
    }

    if (elementName.value == "") {
        console.log("Element name is empty");

        const elementNameBorderBackup = elementName.style.border;
        elementName.style.border = "2px solid red";
        elementName.onchange = () => {
            // Restoring the border to its original state.
            elementName.style.border = elementNameBorderBackup;
        };

        requiredValuesEmpty = true;
    }

    if (!requiredValuesEmpty) {
        const newElement = document.createElement(elementType.value);
        newElement.id = elementName.value;
        newElement.setAttribute("data-draggable", "");

        newElement.innerText = elementText.value;
        newElement.style.fontSize = `${elementFontSize.value}px`;
        newElement.style.fontFamily = elementFontFamily.value;

        newElement.style.color = elementTextColor.value;
        newElement.style.backgroundColor = elementBgColor.value;

        // newElement.style.display = "flex";
        newElement.style.userSelect = "none";

        newElement.style.width = `${elementWidth.value}px`;
        newElement.style.height = `${elementHeight.value}px`;

        console.log("Width: ");
        console.log(elementWidth);

        console.log("Height: ");
        console.log(elementHeight);

        newElement.style.minWidth = `${elementWidth.value}px`;
        newElement.style.minHeight = `${elementHeight.value}px`;

        workspace.appendChild(newElement);
        dragElement(newElement);
    }
};
