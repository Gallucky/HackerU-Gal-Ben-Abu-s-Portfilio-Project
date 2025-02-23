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
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
        document.querySelector(".active").classList.remove("active");
        this.parentElement.classList.add("active");
    });
});

const translations = {
    en: {
        navLinkHome: "Home",
        navLinkAbout: "About",
        navLinkServices: "Services",
        navLinkContact: "Contact",
    },
    he: {
        navLinkHome: "ראשי",
        navLinkAbout: "אודות",
        navLinkServices: "שירותים",
        navLinkContact: "צור קשר",
    },
};

const swapLanguage = (clickedLanguage) => {
    const html = document.documentElement;
    const rtlLangs = ["ar", "he", "fa", "ps", "ur"];

    if (rtlLangs.includes(clickedLanguage)) {
        html.dir = "rtl";
    } else {
        html.dir = "ltr";
    }

    // Changing the language.
    const elementsToTranslate = document.querySelectorAll("[data-translate-supported]");
    const elementsToTranslateArray = Array.from(elementsToTranslate);

    const abbrElementsToTranslate = document.querySelectorAll("[data-translate-supported-abbr]");
    const abbrElementsToTranslateArray = Array.from(abbrElementsToTranslate);

    elementsToTranslateArray.forEach((element) => {
        const translationKey = element.getAttribute("data-translate-supported");
        const translation = translations[clickedLanguage][translationKey];
        element.textContent = translation;
    });

    abbrElementsToTranslateArray.forEach((element) => {
        const translationKey = element.getAttribute("data-translate-supported-abbr");
        const translation = translations[clickedLanguage][translationKey];
        element.title = translation;
    });
};

const supportedLanguages = document.querySelectorAll(".supported-languages span");

supportedLanguages.forEach((language) => {
    language.onclick = () => {
        // Making sure the rest of the supported languages have the class "change-language-option".
        supportedLanguages.forEach((lang) => {
            if (!lang.classList.contains("change-language-option")) {
                lang.classList.add("change-language-option");
            }
        });

        // Removing the class "change-language-option" from the clicked language.
        language.classList.remove("change-language-option");

        const clickedLanguageCode = language.getAttribute("data-lang");
        swapLanguage(clickedLanguageCode);
    };
});

const updateActiveLinkOnScroll = () => {
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

// Running as soon as page loads.
updateActiveLinkOnScroll();
