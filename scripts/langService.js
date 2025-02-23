const translations = {
    en: {
        navLinkHome: "Home",
        navLinkAbout: "About",
        navLinkServices: "Services",
        navLinkContact: "Contact",
    },
    he: {
        navLinkHome: "ראשי",
        navLinkAbout: "אודות",
        navLinkServices: "שירותים",
        navLinkContact: "צור קשר",
    },
};

const swapLanguage = (clickedLanguage) => {
    const html = document.documentElement;
    const rtlLangs = ["ar", "he", "fa", "ps", "ur"];

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
