import { DraggableElement } from "./DraggableElements.js";

export class A extends DraggableElement {
    url;
    newTab;

    constructor(
        name,
        width,
        height,
        text,
        bgColor,
        textColor,
        fontSize,
        fontFamily,
        url,
        newTab = false
    ) {
        super(name, width, height, text, bgColor, textColor, fontSize, fontFamily);

        this.element = document.createElement("a");
        this.element.style.id =
            "created-draggable-element-a-" + `${this.createdElementID}-` + this.name.toLowerCase();

        this.url = url;

        this.updateDraggableElement();

        this.element.href = this.url;
        this.newTab = newTab;

        if (this.newTab) {
            this.element.target = "_blank";
        }
    }

    static initialize() {
        new A("A", "100px", "100px", "link", "#fff", "#000", "16px", "Arial", "", "", true);
    }
}
