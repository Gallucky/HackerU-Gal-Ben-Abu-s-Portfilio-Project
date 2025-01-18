export const fontNames = [
    "Merriweather",
    "Rubik",
    "Playfair Display",
    "Bebas Neue",
    "Roboto",
    "Lato",
    "Montserrat",
    "Poppins",
    "Dancing Script",
    "Pacifico",
    "Source Code Pro",
    "David Libre",
    "Frank Ruhl Libre",
    "Assistant",
    "Arimo",
    "Secular One",
    "Amatic SC",
    "Heebo",
    "Varela Round",
    "IBM Plex Mono",
];

export const populateFontFamilySelectionOptions = (selectionFontFamily) => {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "- Select Font -";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectionFontFamily.appendChild(defaultOption);

    for (let i = 0; i < fontNames.length; i++) {
        const option = document.createElement("option");
        option.value = fontNames[i];
        option.textContent = fontNames[i];
        option.style.fontFamily = fontNames[i];
        selectionFontFamily.appendChild(option);
    }
};

export const getFontFamilySelectionOnValueChangeListenerHandler = (selectionFontFamily) => {
    selectionFontFamily.onchange = (e) => {
        Array.from(selectionFontFamily.children).forEach((option) => {
            if (option instanceof HTMLOptionElement) {
                option.selected = false;
            }
        });

        console.log(e.target.value);
        if (e.target.value === "") {
            selectionFontFamily.style.fontFamily = "Rubik";
        } else {
            selectionFontFamily.style.fontFamily = e.target.value;
            console.log(e);
        }
    };
};
