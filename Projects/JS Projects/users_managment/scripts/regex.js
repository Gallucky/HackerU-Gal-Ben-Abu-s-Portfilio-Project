import { getRegistrationLogic } from "./registration.js";
import { emailIsTaken } from "./domService.js";
import { getLoginLogic } from "./login.js";

export const initializeRegex = () => {
    // Registration.
    const registerFirstName = document.getElementById("register-first-name");
    const registerLastName = document.getElementById("register-last-name");
    const registerEmail = document.getElementById("register-email");
    const registerPassword = document.getElementById("register-password");
    const registerButton = document.getElementById("register-btn");

    // ~~~ Helpers ~~~ //
    const registerFirstNameHelper = document.getElementById("register-first-name-helper");
    const registerLastNameHelper = document.getElementById("register-last-name-helper");
    const registerEmailHelper = document.getElementById("register-email-helper");
    const registerPasswordHelper = document.getElementById("register-password-helper");

    const checkRegistrationFormIsValid = () => {
        const isFirstNameValid = !registerFirstName.classList.contains("error");
        const isLastNameValid = !registerLastName.classList.contains("error");
        const isEmailValid = !registerEmail.classList.contains("error");
        const isPasswordValid = !registerPassword.classList.contains("error");

        // Save functionality.
        const registrationFunctionality = getRegistrationLogic();

        if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
            registerButton.onsubmit = registrationFunctionality;
            registerButton.classList.remove("disabled");
            registerButton.disabled = false;
        } else {
            registerButton.onsubmit = (e) => {
                e.preventDefault();
                console.log(
                    "%cRegister button is disabled until all fields are valid.",
                    "color: red;"
                );
            };

            if (!registerButton.classList.contains("disabled")) {
                registerButton.classList.add("disabled");
            }

            registerButton.disabled = true;
        }
    };

    registerFirstName.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        if (value.length < 3) {
            registerFirstNameHelper.innerText = "First name must be at least 3 characters long.";
            if (!registerFirstName.classList.contains("error")) {
                registerFirstName.classList.add("error");
            }
        } else {
            registerFirstNameHelper.innerText = "";
            registerFirstName.classList.remove("error");
        }

        checkRegistrationFormIsValid();
    });

    registerLastName.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        if (value.length < 3) {
            registerLastNameHelper.innerText = "Last name must be at least 3 characters long.";
            if (!registerLastName.classList.contains("error")) {
                registerLastName.classList.add("error");
            }
        } else {
            registerLastNameHelper.innerText = "";
            registerLastName.classList.remove("error");
        }

        checkRegistrationFormIsValid();
    });

    registerEmail.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailRegex.test(value)) {
            registerEmailHelper.innerText = "Email must be a valid email address";
            if (!registerEmail.classList.contains("error")) {
                registerEmail.classList.add("error");
            }
        } else if (emailIsTaken(value)) {
            registerEmailHelper.innerText = "There is already an account with said email";
            if (!registerEmail.classList.contains("error")) {
                registerEmail.classList.add("error");
            }
        } else {
            registerEmailHelper.innerText = "";
            registerEmail.classList.remove("error");
        }

        checkRegistrationFormIsValid();
    });

    registerPassword.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*[^a-zA-Z\d!@#$%^&*]).{8,}$/;

        if (!passwordRegex.test(value)) {
            registerPasswordHelper.innerText =
                "Password must follow the following rules:\n" +
                "at least 8 characters\n" +
                "at least one uppercase letter\n" +
                "at least one lowercase letter\n" +
                "at least one digit\n" +
                "at least one special character (e.g. !@#$%^&)\n" +
                "english characters only";
            if (!registerPassword.classList.contains("error")) {
                registerPassword.classList.add("error");
            }
        } else {
            registerPasswordHelper.innerText = "";
            registerPassword.classList.remove("error");
        }
        checkRegistrationFormIsValid();
    });

    // Login.
    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");
    const loginButton = document.getElementById("login-btn");

    // ~~~ Helpers ~~~ //
    const loginEmailHelper = document.getElementById("login-email-helper");
    const loginPasswordHelper = document.getElementById("login-password-helper");

    const checkLoginFormIsValid = () => {
        const isEmailValid = !loginEmail.classList.contains("error");
        const isPasswordValid = !loginPassword.classList.contains("error");

        // Save functionality.
        const loginFunctionality = getLoginLogic();

        if (isEmailValid && isPasswordValid) {
            loginButton.onsubmit = loginFunctionality;
            loginButton.classList.remove("disabled");
            loginButton.disabled = false;
        } else {
            loginButton.onsubmit = (e) => {
                e.preventDefault();
                console.log(
                    "%cLogin button is disabled until all fields are valid.",
                    "color: red;"
                );
            };

            if (!loginButton.classList.contains("disabled")) {
                loginButton.classList.add("disabled");
            }

            loginButton.disabled = true;
        }
    };

    loginEmail.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailRegex.test(value)) {
            loginEmailHelper.innerText = "Email must be a valid email address";
            if (!loginEmail.classList.contains("error")) {
                loginEmail.classList.add("error");
            }
        } else {
            loginEmailHelper.innerText = "";
            loginEmail.classList.remove("error");
        }

        checkLoginFormIsValid();
    });

    loginPassword.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*[^a-zA-Z\d!@#$%^&*]).{8,}$/;

        if (!passwordRegex.test(value)) {
            loginPasswordHelper.innerText = "Password does not follow the rules.";
            if (!loginPassword.classList.contains("error")) {
                loginPassword.classList.add("error");
            }
        } else {
            loginPasswordHelper.innerText = "";
            loginPassword.classList.remove("error");
        }
        checkLoginFormIsValid();
    });

    // Edit.
    const editEmail = document.getElementById("edit-user-email");
    const editPassword = document.getElementById("edit-user-password");
    const editSaveButton = document.getElementById("edit-save-btn");
    const editCancelButton = document.getElementById("edit-cancel-btn");

    // ~~~ Helpers ~~~ //
    const editEmailHelper = document.getElementById("edit-user-email-helper");
    const editPasswordHelper = document.getElementById("edit-user-password-helper");

    editEmail.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailRegex.test(value)) {
            editEmailHelper.innerText = "Email must be a valid email address";
            if (!editEmail.classList.contains("error")) {
                editEmail.classList.add("error");
            }
        } else {
            editEmailHelper.innerText = "";
            editEmail.classList.remove("error");
        }

        checkEditFormIsValid();
    });

    editPassword.addEventListener("input", (e) => {
        const value = e.target.value.trim();
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*[^a-zA-Z\d!@#$%^&*]).{8,}$/;

        if (!passwordRegex.test(value)) {
            editPasswordHelper.innerText = "Password does not follow the rules.";
            if (!editPassword.classList.contains("error")) {
                editPassword.classList.add("error");
            }
        } else {
            editPasswordHelper.innerText = "";
            editPassword.classList.remove("error");
        }
        checkEditFormIsValid();
    });

    const checkEditFormIsValid = () => {
        const isEmailValid = !editEmail.classList.contains("error");
        const isPasswordValid = !editPassword.classList.contains("error");

        // Save functionality.
        const editFunctionality = getRegistrationLogic();

        if (isEmailValid && isPasswordValid) {
            editSaveButton.onsubmit = editFunctionality;
            editSaveButton.classList.remove("disabled");
            editSaveButton.disabled = false;
        } else {
            editSaveButton.onsubmit = (e) => {
                e.preventDefault();
                console.log("%cEdit button is disabled until all fields are valid", "color: red;");
            };

            if (!editSaveButton.classList.contains("disabled")) {
                editSaveButton.classList.add("disabled");
            }

            editSaveButton.disabled = true;
        }
    };
};
