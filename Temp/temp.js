const activeLink = document.querySelector(".active-link");

if (activeLink) {
    activeLink.classList.remove("active-link");

    // Adding the class to the list item (li),
    // parent element of the link that was clicked.
    link.parentElement.classList.add("active-link");

    // Getting the clicked link's position.
    const activeLinkParentRectArea = activeLink.parentElement.getBoundingClientRect();
    const linkParentRectArea = link.parentElement.getBoundingClientRect();
    const moveDistance = activeLinkParentRectArea.left - linkParentRectArea.left;

    console.log("activeLinkParentRectArea:", activeLinkParentRectArea);

    console.log("activeLinkParentRectArea.left:", activeLinkParentRectArea.left);
    console.log("linkParentRectArea.left:", linkParentRectArea.left);
    console.log("moveDistance:", moveDistance);

    // Setting the css variable's value.
    link.parentElement.style.setProperty("--move-distance", `${moveDistance}px`);

    // Triggering the animation.
    setTimeout(() => {
        link.parentElement.classList.add("animate");
    }, 10);
}
