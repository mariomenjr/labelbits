import Action from "./Action";

/**
 * Represents a plugin for objects in the Fabric.js library.
 * It provides an abstract base class for creating plugins that can be used in the application.
 *
 * @template T The type of the handler function for the plugin.
 */
export default interface Plugin<T> {
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
