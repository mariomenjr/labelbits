import { PluginObjectAction, IPluginObject } from "@labelbits/designer-shared/fabric";
import { Plugin, Action } from "@labelbits/designer-shared";

/**
 * Represents a plugin for objects in the Fabric.js library.
 * Provides an abstract base class for creating plugins that can be used in the application to manipulate Fabric.js objects.
 * 
 * @abstract
 * @implements {Plugin<PluginObjectAction>}
 */
export default abstract class FabricObjectPlugin implements Plugin<PluginObjectAction> {
    /**
     * The name of the plugin.
     * 
     * @public
     * @type {string}
     * @abstract
     */
    public abstract name: string;

    /**
     * Creates a new object asynchronously.
     * The object is created with the default value of the plugin.
     * 
     * @returns {Promise<IPluginObject>} A promise that resolves to the created object.
     */
    public abstract createObjectAsync(): Promise<IPluginObject>;

    /**
     * Retrieves the action for the plugin asynchronously.
     * 
     * @param {PluginObjectAction} handler - The handler function for the plugin.
     * @returns {Promise<Action>} A promise that resolves to the `Action` for the plugin.
     */
    public async getActionAsync(handler: PluginObjectAction): Promise<Action> {
        return {
            id: this.name,
            icon: this.name,
            onClick: async () => handler(await this.createObjectAsync())
        };
    }
}
