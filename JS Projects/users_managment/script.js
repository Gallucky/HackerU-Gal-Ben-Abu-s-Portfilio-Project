import { User } from "./User.js";
import { initializeRegex } from "./regex.js";
import { initializeRegistrationLogic } from "./registration.js";
import { initializeTable } from "./domService.js";

// Initialize table.
initializeTable(User.users);

// Initialize registration logic.
initializeRegistrationLogic();

// Initialize regex.
initializeRegex();
