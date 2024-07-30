import { VoidHandler, VoidHandlerAsync } from "../utils/handlers";
import Element from "./Element";

/**
 * Represents a control button that can be used in the toolbox.
 * An Action is an extension of the Element interface and adds two properties:
 * - icon: the icon class name associated with the button
 * - onClick: the click handler function for the button
 */
export default interface Action extends Element {
    /**
     * The icon class name associated with the button.
     * This property specifies the name of the CSS class that will be applied to the button
     * to display the corresponding icon.
     */
    icon: string;

    /**
     * The click handler function for the button.
     * This property specifies the function that will be called when the button is clicked.
     */
    onClick: VoidHandler | VoidHandlerAsync;
}
