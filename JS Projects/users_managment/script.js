import { User } from "./User.js";
import { initializeLocalStorage } from "./localStorageService.js";
import { initializeRegex } from "./regex.js";
import { initializeRegistrationLogic } from "./registration.js";

// Local storage setup.
initializeLocalStorage();

// Initialize registration logic.
initializeRegistrationLogic();

// Initialize regex.
initializeRegex();

// Users Management.
const usersList = document.getElementById("users-list");
