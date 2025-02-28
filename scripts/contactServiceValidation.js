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
            // Displaying success dialog with message.
            const dialog = document.createElement("div");
            dialog.id = "message-sent-dialog";
            dialog.innerHTML = '<h2 id="success-message">ההודעה נשלחה בהצלחה!</h2>';
            document.body.appendChild(dialog);

            // Clearing form control inputs.
            fullNameInput.value = "";
            emailInput.value = "";
            telephoneInput.value = "";
            messageInput.value = "";
        }
    });
};
