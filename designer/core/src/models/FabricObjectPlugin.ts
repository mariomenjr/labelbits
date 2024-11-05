import { PluginObjectAction, IPluginObject } from "@labelbits/designer-shared/fabric";
import { Plugin, Action, GenericAction } from "@labelbits/designer-shared";

/**
 * Represents a plugin for objects in the Fabric.js library.
 * Provides an abstract base class for creating plugins that can be used in the application to manipulate Fabric.js objects.
 * 
 * @abstract
 * @implements {Plugin<PluginObjectAction>}
 */
export default abstract class FabricObjectPlugin implements Plugin<PluginObjectAction> {
    /**
     * Executed when an object is added to the canvas.
     * 
     * @protected
     * @param target - The target object that was added to the canvas.
     */
    protected onAdded?: GenericAction<IPluginObject>;
    
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
            onClick: async () => handler(this.attachEvents(await this.createObjectAsync()))
        };
    }

    /**
     * Attaches the behavior defined in the plugin to the given object.
     * 
     * It checks if handlers are available and if so, it attaches the behavior to the specific event of the object.
     * The behavior is called with the target of the event as its argument.
     * 
     * @param {IPluginObject} o - The object to which to attach the behavior.
     * @returns {IPluginObject} The object with the behavior attached.
     */
    private attachEvents(o: IPluginObject): IPluginObject {
        
        // Attach behavior if handler is available
        if (!!this.onAdded) {

            // Attach behavior to the plugin object   
            o.on('added', (_) => this.onAdded!(o));
        }

        // ... more events.
        return o;
    }
}
