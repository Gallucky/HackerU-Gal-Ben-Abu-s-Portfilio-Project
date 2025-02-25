import { initializeLanguageService } from "./scripts/langService.js";
import { updateActiveLinkOnScroll } from "./scripts/navbarService.js";
import { initializeHtmlCssSlider } from "./scripts/sliders/htmlCssProjectsSliderService.js";

// Loading translations.
initializeLanguageService();

// Running as soon as page loads.
updateActiveLinkOnScroll();

// Initializing the sliders logic.
initializeHtmlCssSlider();
