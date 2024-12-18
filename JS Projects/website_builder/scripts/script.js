// Testing the drag idea.

const testerDiv = document.getElementById("example-test-div");

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

    const moveElement = (e) => {
        mouseXPos = elementXPos - e.clientX;
        mouseYPos = elementYPos - e.clientY;
        elementXPos = e.clientX;
        elementYPos = e.clientY;

        element.style.top = `${element.offsetTop - mouseYPos}px`;
        element.style.left = `${element.offsetLeft - mouseXPos}px`;
    };

    const startDragging = (e) => {
        e.preventDefault(); // Add this to prevent any default behaviors
        elementXPos = e.clientX;
        elementYPos = e.clientY;

        window.addEventListener("mousemove", moveElement); // Change to window
        window.addEventListener("mouseup", stopDragging, { once: true }); // Add once: true
        element.style.cursor = "grabbing";
    };

    const stopDragging = () => {
        window.removeEventListener("mousemove", moveElement);
        element.style.cursor = "grab";
    };

    // Initial setup
    element.style.cursor = "grab";
    element.style.position = "absolute"; // Ensure element is positioned
    element.addEventListener("mousedown", startDragging);
};

dragElement(testerDiv);
