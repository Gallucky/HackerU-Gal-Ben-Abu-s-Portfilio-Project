// Testing the drag idea.

const testerDiv = document.getElementById("example-test-div");

testerDiv.onclick = (e) => {
    console.log("Clicked!");
    e.target.style.cursor = "grab";
};

testerDiv.ondrag = (e) => {
    console.log("Dragging!");
    e.target.style.cursor = "grabbing";
    e.target.style.border = "3px solid black";
    e.target.style.x = e.clientX;
    e.target.style.y = e.clientY;
};

testerDiv.ondragend = (e) => {
    console.log("Drag end!");
    e.target.style.cursor = "grab";
    e.target.style.border = "1px solid black";
};
