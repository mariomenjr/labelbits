/**
 * Represents an HTML input element that can help edit the canvas items.
 *
 * An Element is a basic building block for creating input elements that can be used to edit
 * objects in the canvas. Each Element has a unique identifier that can be used to identify
 * and manipulate the corresponding HTML element.
 */
export default interface Element {
    /**
     * A unique identifier for this HTML input element.
     *
     * The id is used to identify the corresponding HTML element when it is rendered in the
     * user interface. It is also used to associate the Element with the corresponding object
     * in the canvas.
     */
    id: string;
}

