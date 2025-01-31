import { User } from "./User.js";

const loginForm = document.getElementById("login-form");
let loginLogic = null;

export const initializeLoginLogic = () => {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const loginEmail = e.target.querySelector("#login-email");
        const loginPassword = e.target.querySelector("#login-password");

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        const userID = User.validateCredentials(email, password);

        if (userID) {
            console.log("Found user with id:", userID);

            User.login(userID);
        } else {
            console.log("Failed to login.");
        }
    });

    loginLogic = loginForm.onsubmit;
};

export const getLoginLogic = () => {
    return loginLogic;
};
