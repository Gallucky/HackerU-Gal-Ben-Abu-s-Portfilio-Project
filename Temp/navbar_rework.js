const linksHamburgerMenu = document.getElementById("links-hamburger-menu");
const linksUnorderedList = document.querySelector("ul");

const overlay = document.querySelector(".overlay");
const closeLinksButton = document.getElementById("links-mobile-close-btn");

linksHamburgerMenu.onclick = (e) => {
    e.preventDefault();

    linksUnorderedList.classList.toggle("open");
    overlay.classList.toggle("active");
};

const closeLinksLogic = (e) => {
    e.preventDefault();

    linksUnorderedList.classList.remove("open");
    overlay.classList.remove("active");
};

overlay.onclick = (e) => closeLinksLogic(e);
closeLinksButton.onclick = (e) => closeLinksLogic(e);

const linksListItems = document.querySelectorAll("ul li");

linksListItems.forEach((link) => {
    link.onclick = () => {
        linksListItems.forEach((l) => l.classList.remove("active-link"));
        if (!link.classList.contains("active-link")) {
            link.classList.add("active-link");
        }
    };
});

// Active link line animation.
document.addEventListener("DOMContentLoaded", () => {
    // Getting all the links in the nav's ul.
    const navLinks = document.querySelectorAll("nav ul a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const dotElement = document.querySelector(".dot");
            const activeLink = document.querySelector(".active-link");

            if (activeLink && dotElement) {
                // Getting the clicked link's position.
                const activeLinkParentRectArea = activeLink.parentElement.getBoundingClientRect();
                const linkParentRectArea = link.parentElement.getBoundingClientRect();
                const moveDistance = linkParentRectArea.left - activeLinkParentRectArea.left;

                console.log("activeLinkParentRectArea:", activeLinkParentRectArea);

                console.log("activeLinkParentRectArea.left:", activeLinkParentRectArea.left);
                console.log("linkParentRectArea.left:", linkParentRectArea.left);
                console.log("moveDistance:", moveDistance);

                // Setting the css variable's value.
                // link.parentElement.style.setProperty("--move-distance", `${moveDistance}px`);

                // Triggering the animation.
                setTimeout(() => {
                    activeLink.classList.remove("active-link");

                    // Adding the class to the list item (li),
                    // parent element of the link that was clicked.
                    link.parentElement.classList.add("active-link");

                    dotElement.classList.add("animate");
                    link.parentElement.classList.add("shrink");

                    const changeAmount = moveDistance > 0 ? 1 : -1;

                    if (moveDistance > 0) {

                        for (let i = 0; i <= Math.abs(Math.round(moveDistance)); i++) {
                            setTimeout(() => {
                                dotElement.style.left = `${i}px`;
                                console.log(i);
                            }, 1000);
                        }
                        setTimeout(() => {
                    }
                        link.parentElement.classList.remove("shrink");
                        dotElement.classList.remove("animate");
                    }, 400);
                }, 10);
            }
        });
    });
});
