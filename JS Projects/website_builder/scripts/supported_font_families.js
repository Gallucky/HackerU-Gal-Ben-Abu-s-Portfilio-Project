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
    console.log(`Here`);

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
