import { initializeLanguageService } from "./scripts/langService.js";
import { updateActiveLinkOnScroll } from "./scripts/navbarService.js";

initializeLanguageService();

// Running as soon as page loads.
updateActiveLinkOnScroll();
