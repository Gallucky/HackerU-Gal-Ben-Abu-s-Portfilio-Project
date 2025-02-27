import { User } from "./User.js";
import { initializeRegex } from "./regex.js";
import { initializeRegistrationLogic } from "./registration.js";
import { initializeTable } from "./domService.js";
import { initializeLoginLogic } from "./login.js";

const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
};

resizeOps();
window.addEventListener("resize", resizeOps);

// Initialize table.
initializeTable(User.users);

// Initialize registration logic.
initializeRegistrationLogic();

// Initialize login logic.
initializeLoginLogic();

// Initialize regex.
initializeRegex();
