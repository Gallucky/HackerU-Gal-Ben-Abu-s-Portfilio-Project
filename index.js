import { initializeLanguageService } from "./scripts/langService.js";
import { updateActiveLinkOnScroll } from "./scripts/navbarService.js";
import { initializeSlider } from "./scripts/slider.js";

// Loading translations.
initializeLanguageService();

// Running as soon as page loads.
updateActiveLinkOnScroll();

const htmlCssProjectsCardsWrapper = document.querySelector(
    "#services-projects .projects-cards-wrapper"
);
const htmlCssProjectsCardsPrevBtn = document.querySelector("#services-projects .prevBtn");
const htmlCssProjectsCardsNextBtn = document.querySelector("#services-projects .nextBtn");

// Initializing the sliders logic.
initializeSlider(
    htmlCssProjectsCardsWrapper,
    htmlCssProjectsCardsPrevBtn,
    htmlCssProjectsCardsNextBtn
);
