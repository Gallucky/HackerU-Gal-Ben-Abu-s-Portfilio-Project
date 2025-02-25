import { initializeLanguageService } from "./scripts/langService.js";
import { updateActiveLinkOnScroll } from "./scripts/navbarService.js";
import { initializeSlider } from "./scripts/slider.js";

// Loading translations.
initializeLanguageService();

// Running as soon as page loads.
updateActiveLinkOnScroll();

// Initializing the sliders logic.
const htmlCssProjectsCardsWrapper = document.querySelector(
    "#services-projects .projects-cards-wrapper"
);
const htmlCssProjectsCardsPrevBtn = document.querySelector("#services-projects .prevBtn");
const htmlCssProjectsCardsNextBtn = document.querySelector("#services-projects .nextBtn");

initializeSlider(
    htmlCssProjectsCardsWrapper,
    htmlCssProjectsCardsPrevBtn,
    htmlCssProjectsCardsNextBtn
);

const jsProjectsCardsWrapper = document.querySelector(
    "#js-projects-and-games .projects-cards-wrapper"
);
const jsProjectsCardsPrevBtn = document.querySelector("#js-projects-and-games .prevBtn");
const jsProjectsCardsNextBtn = document.querySelector("#js-projects-and-games .nextBtn");

initializeSlider(jsProjectsCardsWrapper, jsProjectsCardsPrevBtn, jsProjectsCardsNextBtn);
