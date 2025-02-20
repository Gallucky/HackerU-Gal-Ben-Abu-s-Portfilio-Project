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

let currentActiveLink = document.querySelector(".active-link");

// Dot animation.
const dot = document.querySelector("nav ul .dot");

const moveDot = (duration, callback = null) => {
    let startTime;

    const animate = (currentTime) => {
        if (!startTime) {
            startTime = currentTime;
        }

        let elapsedTime = currentTime - startTime;
        // Progress is a value between 0 and 1,
        // if it is larger than 1 default to 1.
        const progress = Math.min(elapsedTime / duration, 1);

        // Breaking if there is no element with the
        // class dot that is child of ul which is a child of nav.
        if (!dot) return;

        if (elapsedTime < duration) {
            // Animation logic:
            const startPos = dot.getBoundingClientRect().left;
            const endPos = currentActiveLink.getBoundingClientRect().left;
            const distance = endPos - startPos;

            // Calculating the new position of the dot.
            const currentPos = startPos + distance * progress;

            // Applying the new position to the dot.
            dot.style.left = `${currentPos}px`;

            // The animation is still in progress, continue it.
            requestAnimationFrame(animate);
        } else {
            // The animation reached the duration limit.
            if (callback) {
                callback();
            }
        }
    };

    requestAnimationFrame(animate);
};

const shrinkIntoDot = (duration, callback = null) => {
    let startTime;

    const animate = (currentTime) => {
        if (!startTime) {
            startTime = currentTime;
        }

        let elapsedTime = currentTime - startTime;
        // Progress is a value between 0 and 1,
        // if it is larger than 1 default to 1.
        const progress = Math.min(elapsedTime / duration, 1);
    };
};

// Applying the active link class to the clicked link.
linksListItems.forEach((link) => {
    link.onclick = () => {
        if (currentActiveLink) {
            currentActiveLink.classList.remove("active-link");
        }

        if (!link.classList.contains("active-link")) {
            link.classList.add("active-link");
        }
    };
});
