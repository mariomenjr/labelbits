
/**
 * Represents a basic interface for an element.
 *
 * This interface defines the minimum requirements for an element. An element is a control
 * that can be used in the toolbox or settings.
 */
export default interface Element {
    /**
     * A unique identifier for this HTML input element.
     *
     * The id is used to identify the corresponding HTML element when it is rendered in the
     * user interface. It is also used to associate the Control with the corresponding object
     * in the canvas.
     *
     * The id should be a valid HTML id attribute value.
     */
    id: string;
}
