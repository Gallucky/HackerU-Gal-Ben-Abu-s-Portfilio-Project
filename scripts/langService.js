export const translations = {
    en: {
        navLinkHome: "Home",
        navLinkAbout: "About",
        navLinkServices: "Services",
        navLinkContact: "Contact",

        // Contact us form.
        contactUsFormTitle: "Contact Us",
        contactUsFormDescription:
            "Contact me with the following form\n" +
            "Fill the details and I reply to you as soon as possible.",
        contactUsFullName: "Full Name",
        contactUsEmail: "Email",
        contactUsTelephone: "Phone Number",
        contactUsMessageContents: "Message Content",
        contactUsSendForm: "Send",
        successDialogMessage: "Message has been sent successfully.",
    },
    he: {
        navLinkHome: "ראשי",
        navLinkAbout: "אודות",
        navLinkServices: "שירותים",
        navLinkContact: "צרו קשר",

        // Contact us form.
        contactUsFormTitle: "צרו קשר",
        contactUsFormDescription:
            'צרו איתי קשר באמצעות הטופס הנ"ל.\n' + "תמלאו את הפרטים ואחזור אליכם בהקדם האפשרי.",
        contactUsFullName: "שם מלא",
        contactUsEmail: 'דוא"ל',
        contactUsTelephone: "טלפון",
        contactUsMessageContents: "תוכן ההודעה",
        contactUsSendForm: "שליחה",
        successDialogMessage: "ההודעה נשלחה בהצלחה!",
    },
};

export const getCurrentLang = () => {
    const html = document.documentElement;

    // Checks if the language is null / undefined or
    // the lang attribute / property is empty string then return the default language.
    // Otherwise return the current language code.
    return !html.lang || html.lang === "" ? "he" : html.lang;
};

const swapLanguage = (clickedLanguage) => {
    const html = document.documentElement;
    const rtlLangs = ["ar", "he", "fa", "ps", "ur"];

    html.lang = clickedLanguage;

    if (rtlLangs.includes(clickedLanguage)) {
        html.dir = "rtl";
    } else {
        html.dir = "ltr";
    }

    // Changing the language.
    const elementsToTranslate = document.querySelectorAll("[data-translate-supported]");
    const elementsToTranslateArray = Array.from(elementsToTranslate);

    const abbrElementsToTranslate = document.querySelectorAll("[data-translate-supported-abbr]");
    const abbrElementsToTranslateArray = Array.from(abbrElementsToTranslate);

    elementsToTranslateArray.forEach((element) => {
        const translationKey = element.getAttribute("data-translate-supported");
        const translation = translations[clickedLanguage][translationKey];
        element.textContent = translation;
    });

    abbrElementsToTranslateArray.forEach((element) => {
        const translationKey = element.getAttribute("data-translate-supported-abbr");
        const translation = translations[clickedLanguage][translationKey];
        element.title = translation;
    });
};

export const initializeLanguageService = () => {
    const supportedLanguages = document.querySelectorAll(".supported-languages span");

    supportedLanguages.forEach((language) => {
        // Skipping disabled languages for not supported pages.
        if (language.parentElement.classList.contains("disabled")) {
            return;
        }
        language.onclick = () => {
            // Making sure the rest of the supported languages have the class "change-language-option".
            supportedLanguages.forEach((lang) => {
                if (!lang.classList.contains("change-language-option")) {
                    lang.classList.add("change-language-option");
                }
            });

            // Removing the class "change-language-option" from the clicked language.
            language.classList.remove("change-language-option");

            const clickedLanguageCode = language.getAttribute("data-lang");
            swapLanguage(clickedLanguageCode);
        };
    });
};
