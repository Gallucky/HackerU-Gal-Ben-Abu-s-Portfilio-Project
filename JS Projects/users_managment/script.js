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
    const registrationFunctionality = registerButton.onclick;

    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid) {
        registerButton.onclick = registrationFunctionality;
        registerButton.classList.remove("disabled");
        registerButton.disabled = false;
    } else {
        registerButton.onclick = (e) => {
            e.preventDefault();
            console.log("%cRegister button is disabled until all fields are valid.", "color: red;");
        };

        if (!registerButton.classList.contains("disabled")) {
            registerButton.classList.add("disabled");
        }

        registerButton.disabled = true;
    }
};

registerFirstName.addEventListener("input", (e) => {
    const value = e.target.value;
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
    const value = e.target.value;
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
    const value = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(value)) {
        registerEmailHelper.innerText = "Email must be a valid email address";
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
    const value = e.target.value;
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

// Users Management.
const usersList = document.getElementById("users-list");
