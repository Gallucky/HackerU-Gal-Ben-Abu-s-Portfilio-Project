// The registration process.
import { User } from "./User.js";

const registerForm = document.getElementById("registration-form");
let submitLogic = null;

export const initializeRegistrationLogic = () => {
    // Setting up the registration button onsubmit logic.
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Registration inputs.
        const registerFirstName = e.target.querySelector("#register-first-name");
        const registerLastName = e.target.querySelector("#register-last-name");
        const registerEmail = e.target.querySelector("#register-email");
        const registerPassword = e.target.querySelector("#register-password");

        console.log("Registering user...\n", e);
        console.log("registerFirstName:", registerFirstName);
        console.log("registerLastName:", registerLastName);
        console.log("registerEmail:", registerEmail);
        console.log("registerPassword:", registerPassword);

        // Getting the input values.
        const firstName = registerFirstName.value.trim();
        const lastName = registerLastName.value.trim();
        const email = registerEmail.value.trim();
        const password = registerPassword.value.trim();

        const user = new User(firstName, lastName, email, password);
        console.log("User registered successfully.");
        console.log("The user:\n", user);
    });

    submitLogic = registerForm.onsubmit;
};

export const getRegistrationOnclickLogic = () => {
    return submitLogic;
};
