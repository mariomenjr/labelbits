import { VoidHandler, VoidHandlerAsync } from "./handlers";

/**
 * Represents a basic interface for an element.
 *
 * This interface defines the minimum requirements for an element. An element is a control
 * that can be used in the toolbox or settings.
 */
export interface Element {
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

/**
 * Represents a control button that can be used in the toolbox.
 * An Action is an extension of the Element interface and adds two properties:
 * - icon: the icon class name associated with the button
 * - onClick: the click handler function for the button
 */
export interface Action extends Element {
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

/**
 * The Collection class is an abstract base class that represents a collection of items.
 * It extends the built-in Array class and provides a way to access and manipulate the items.
 *
 * @template T - The type of items in the collection.
 */
export abstract class Collection<T> extends Array<T> {
    /**
     * Gets the items in the collection as an array.
     *
     * @returns {T[]} - The items in the collection.
     */
    get items(): T[] {
        // Return a new array containing all the items in the collection.
        // The spread operator is used to create a shallow copy of the array.
        return [...this];
    }
}

/**
 * Represents a plugin for objects in the Fabric.js library.
 * It provides an abstract base class for creating plugins that can be used in the application.
 *
 * @template T The type of the handler function for the plugin.
 */
export interface Plugin<T> {
    /**
     * The name of the plugin.
     */
    name: string;

    /**
     * Retrieves the action for the plugin asynchronously.
     * @param handler The handler function for the plugin.
     * @returns A promise that resolves to the action.
     */
    getActionAsync(handler: T): Promise<Action>;
}
