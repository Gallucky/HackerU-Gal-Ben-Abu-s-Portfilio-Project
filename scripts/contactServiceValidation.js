import { translations, getCurrentLang } from "./langService.js";

// Defining regex patterns
const regexPatterns = {
    fullName: /^[\p{L}\s]{2,}$/u,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telephone: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    message: /^(?=.*\S)[\p{L}\p{N}\s\p{P}]{10,}$/u,
};

// Object to store validation states.
const validationState = {
    fullName: false,
    email: false,
    telephone: false,
    message: false,
};

const checkPattern = (pattern, value) => pattern.test(value);

const toggleValidationClass = (element, isValid) => {
    element.classList.toggle("invalid-form-control", !isValid);
};

const updateButtonState = () => {
    const submitBtn = document.getElementById("submit-btn");
    const allValid =
        validationState.fullName &&
        validationState.email &&
        validationState.telephone &&
        validationState.message;
    submitBtn.classList.toggle("disabled", !allValid);
};

const handleInputValidation = (fieldName, element, regex) => {
    const validate = () => {
        const value = element.value.trim();
        validationState[fieldName] = checkPattern(regex, value);
        toggleValidationClass(element, validationState[fieldName]);
        updateButtonState();
    };

    element.addEventListener("input", validate);
    element.addEventListener("blur", validate);
    element.addEventListener("focus", () => element.classList.remove("invalid-form-control"));

    // Initial validation check.
    validate();
};

const showSuccessDialog = (message = "ההודעה נשלחה בהצלחה!") => {
    // Creating a backdrop that can be clicked to close the dialog.
    const backdrop = document.createElement("div");
    backdrop.id = "dialog-backdrop";
    document.body.appendChild(backdrop);

    // Creating the dialog itself.
    const dialog = document.createElement("div");
    dialog.id = "message-sent-dialog";

    // Adding a success icon and message.
    dialog.innerHTML =
        '<div class="success-icon"></div>\n' +
        '<h2 id="success-message" class="outline-text" data-translate-supported="successDialogMessage">' +
        message +
        "</h2>\n" +
        '<button id="dialog-close"></button>';

    document.body.appendChild(dialog);

    // Adding the closing functionality to the button.
    document.getElementById("dialog-close").addEventListener("click", closeDialog);
    backdrop.addEventListener("click", closeDialog);

    // Showing the dialog with a slight delay for better visual effect.
    setTimeout(() => {
        backdrop.classList.add("show");
        dialog.classList.add("show");
    }, 10);

    // Auto-closing after 5 seconds.
    setTimeout(closeDialog, 5000);

    // Defining the escape key support logic.
    const escKeyHandler = (e) => {
        if (e.key === "Escape") {
            // Before closing removing the event listening because,
            // there is no longer a need for it after the dialog was closed.
            document.removeEventListener("keydown", escKeyHandler);
            closeDialog();
        }
    };

    // Adding an escape key support for closing the dialog.
    document.addEventListener("keydown", escKeyHandler);
};

const closeDialog = () => {
    const dialog = document.getElementById("message-sent-dialog");
    const backdrop = document.getElementById("dialog-backdrop");

    if (dialog && backdrop) {
        dialog.classList.remove("show");
        backdrop.classList.remove("show");

        // Removing the elements added after the transition completes.
        setTimeout(() => {
            if (dialog.parentNode) dialog.parentNode.removeChild(dialog);
            if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
        }, 500);
    }
};

export const initializeFormValidation = () => {
    const fullNameInput = document.querySelector("#form-content input#user-full-name");
    const emailInput = document.querySelector("#form-content input#user-email");
    const telephoneInput = document.querySelector("#form-content input#user-phone-number");
    const messageInput = document.querySelector("#form-content textarea#user-message-contents");

    // Preventing letters from being typed in the telephone input field.
    telephoneInput.addEventListener("keypress", (e) => {
        const char = e.key;
        if (!/[\d\s+-.]/.test(char)) {
            e.preventDefault();
        }
    });

    // Attaching validation handlers manually.
    handleInputValidation("fullName", fullNameInput, regexPatterns.fullName);
    handleInputValidation("email", emailInput, regexPatterns.email);
    handleInputValidation("telephone", telephoneInput, regexPatterns.telephone);
    handleInputValidation("message", messageInput, regexPatterns.message);

    const submitBtn = document.getElementById("submit-btn");

    // Handling form submission via submit button click.
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (
            validationState.fullName &&
            validationState.email &&
            validationState.telephone &&
            validationState.message
        ) {
            const currentLang = getCurrentLang();
            // Getting the success message in the right language with a fallback message.
            const successDialogMessage =
                translations[currentLang]["successDialogMessage"] ||
                translations["he"]["successDialogMessage"];

            // Displaying success dialog with message.
            showSuccessDialog(successDialogMessage);
            console.log("Success dialog has been shown.");

            // Clearing form control inputs.
            fullNameInput.value = "";
            emailInput.value = "";
            telephoneInput.value = "";
            messageInput.value = "";
        }
    });
};
