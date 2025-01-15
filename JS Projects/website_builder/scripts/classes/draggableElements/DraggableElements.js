export class DraggableElement {
    static #subclasses = new Set();

    static get subclasses() {
        return DraggableElement.#subclasses;
    }

    constructor() {
        // If the constructor is not the called
        // from the DraggableElement class
        // then it is called from a subclass.
        // Add the subclass to the list of subclasses.
        if (this.constructor !== DraggableElement) {
            DraggableElement.#subclasses.add(this.constructor.prototype.name);
            const msg =
                `DraggableElement's constructor was called from a subclass.\n` +
                `Adding the ${this.constructor.prototype} subclass to the list of subclasses.`;
            console.log(msg);
        }
    }
}
