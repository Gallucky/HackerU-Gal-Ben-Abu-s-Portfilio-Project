export const rgbStringToHex = (rgb) => {
    // Currently the rgb value can be in a format of rgb(value, value, value).
    // Removing 'rgb', parentheses, and spaces
    rgb = rgb.replace("rgb(", "").replace(")", "").trim();

    // Now the rgb value is in a format of 'value,value,value'
    // and can be splitted using the ','.
    const rgbArray = rgb.split(",").map(Number);

    // Validating the RGB values.
    if (rgbArray.length !== 3 || !isValidRgb(rgbArray)) {
        throw new Error("Invalid RGB format or values out of range (0-255).");
    }

    // Converting RGB to Hex.
    return rgbValuesToHex(rgbArray[0], rgbArray[1], rgbArray[2]);
};

export const rgbValuesToHex = (red, green, blue) => {
    const rgbArray = [red, green, blue];

    if (!isValidRgb(rgbArray)) {
        throw new Error("RGB values must be in the range of 0 to 255.");
    }

    const hexString =
        "#" +
        rgbArray
            .forEach((colorValue) => {
                return colorValue.toHex().padStart(2, "0");
            })
            .reduce((item, acc) => {
                return acc + item;
            });

    return hexString;
};

// Checks the given RGB values array using the every method.
// The every method will return true only if every element/item in
// the array which the method was called from returned true
// on the given condition otherwise it will return false.
export const isValidRgb = (rgbArray) => {
    return rgbArray.every(
        (value) => typeof value === "number" && !isNaN(value) && value >= 0 && value <= 255
    );
};
