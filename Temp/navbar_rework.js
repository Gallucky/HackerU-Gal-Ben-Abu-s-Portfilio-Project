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
