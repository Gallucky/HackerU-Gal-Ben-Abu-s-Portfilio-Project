import { User } from "./User.js";
import { addUserToLocalStorage } from "./localStorageService.js";

// The registration process.

let onclickLogic = null;

export const initializeRegistrationLogic = () => {
    // Registration inputs.
    const registerFirstName = document.getElementById("register-first-name");
    const registerLastName = document.getElementById("register-last-name");
    const registerEmail = document.getElementById("register-email");
    const registerPassword = document.getElementById("register-password");
    const registerButton = document.getElementById("register-btn");

    // Setting up the registration button onclick logic.
    registerButton.onclick = (e) => {
        e.preventDefault();

        // Getting the input values.
        const firstName = registerFirstName.value.trim();
        const lastName = registerLastName.value.trim();
        const email = registerEmail.value.trim();
        const password = registerPassword.value.trim();

        const user = new User(firstName, lastName, email, password);
        addUserToLocalStorage(user);
        console.log("User registered successfully.");
    };

    onclickLogic = registerButton.onclick;
};

export const getRegistrationOnclickLogic = () => {
    return onclickLogic;
};
