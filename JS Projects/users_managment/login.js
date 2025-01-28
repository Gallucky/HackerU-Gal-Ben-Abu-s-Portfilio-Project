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

        const res = User.validateCredentials(email, password);

        if (res) {
            console.log("Found user with id:", res);

            User.login(email.password);
        } else {
            console.log("Failed to login.");
        }
    });

    loginLogic = loginForm.onsubmit;
};

export const getLoginLogic = () => {
    return loginLogic;
};
