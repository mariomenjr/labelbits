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
     * 
     * @type {string}
     */
    id: string;
}

/**
 * Represents a control button that can be used in the toolbox.
 * An Action is an extension of the `Element` interface and adds two properties:
 * - `icon`: the icon class name associated with the button
 * - `onClick`: the click handler function for the button
 */
export interface Action extends Element {
    /**
     * The icon class name associated with the button.
     * 
     * This property specifies the name of the CSS class that will be applied to the button
     * to display the corresponding icon.
     * 
     * @type {string}
     */
    icon: string;

    /**
     * The click handler function for the button.
     * 
     * This property specifies the function that will be called when the button is clicked.
     * It can be either a synchronous or asynchronous function.
     * 
     * @type {VoidHandler | VoidHandlerAsync}
     */
    onClick: VoidHandler | VoidHandlerAsync;
}

/**
 * Represents a plugin for objects in the Fabric.js library.
 * It provides an abstract base class for creating plugins that can be used in the application.
 *
 * @template T - The type of the handler function for the plugin.
 */
export interface Plugin<T> {
    /**
     * The name of the plugin.
     * 
     * @type {string}
     */
    name: string;

    /**
     * Retrieves the action for the plugin asynchronously.
     * 
     * @param {T} handler - The handler function for the plugin.
     * @returns {Promise<Action>} A promise that resolves to the `Action` for the plugin.
     */
    getActionAsync(handler: T): Promise<Action>;
}
