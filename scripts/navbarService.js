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

// Updating the active class.
document.querySelectorAll(".nav-link").forEach((link, index) => {
    console.log("Link Index:", index, link);
    console.log(document.querySelector(".active"));

    link.addEventListener("click", function () {
        const activeElement = document.querySelector(".active");
        if (activeElement) {
            activeElement.classList.remove("active");
        }
        this.parentElement.classList.add("active");
    });
});

export const updateActiveLinkOnScroll = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        // Removing active class from all links.
        link.parentElement.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSection) {
            // Adding the active class to the current section based on the scrollbar position.
            link.parentElement.classList.add("active");
        }
    });
};

// Listen for scroll events.
window.addEventListener("scroll", updateActiveLinkOnScroll);
