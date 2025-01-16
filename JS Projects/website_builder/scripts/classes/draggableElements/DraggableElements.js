export class DraggableElement {
    static #subclasses = new Set();
    static #id = 0;

    #createdElementID;

    name;
    style;
    element;

    locationX;
    locationY;

    static get subclasses() {
        return DraggableElement.#subclasses;
    }

    constructor(name, width, height, text, bgColor, textColor, fontSize, fontFamily) {
        // If the constructor is not the called
        // from the DraggableElement class
        // then it is called from a subclass.
        // Add the subclass to the list of subclasses.
        if (this.constructor !== DraggableElement) {
            DraggableElement.#subclasses.add(this.constructor.name);
            const msg =
                `DraggableElement's constructor was called from a subclass.\n` +
                `Adding the ${this.constructor.name} subclass to the list of subclasses.`;
            console.log(msg);
        }

        DraggableElement.#id++;
        this.#createdElementID = DraggableElement.#id;

        this.name = name.toLowerCase().replace(" ", "-");
        this.style = {
            width: width,
            height: height,
            textContent: text,
            backgroundColor: bgColor,
            color: textColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
        };
        this.element = null;

        this.locationX = 0;
        this.locationY = 0;
    }

    updateDraggableElement() {
        Object.assign(this.element.style, this.style);
    }
}
