import { initializeLanguageService } from "./langService.js";
import { updateActiveLinkOnScroll } from "./navbarService.js";

// Loading translations.
initializeLanguageService();

// Running as soon as page loads.
updateActiveLinkOnScroll();
