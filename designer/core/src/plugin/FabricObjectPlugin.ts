import * as fabric from "fabric";
import { SettingDefinition, SettingDefinitionCollection, getSettingCollectionSource } from "@labelbits/designer-shared/setting";
import { PluginObject, FabricObjectHandler } from "@labelbits/designer-shared/fabric";
import { Plugin, Action } from "@labelbits/designer-shared";

/**
 * Represents a plugin for objects in the Fabric.js library.
 * Provides an abstract base class for creating plugins that can be used in the application to manipulate Fabric.js objects.
 * 
 * @abstract
 * @implements {Plugin<FabricObjectHandler>}
 */
export default abstract class FabricObjectPlugin implements Plugin<FabricObjectHandler> {
    
    /**
     * The default value of the plugin, which is used when creating a new object.
     * 
     * @protected
     * @abstract
     * @type {string}
     */
    protected abstract defaultValue: string;

    /**
     * The name of the plugin.
     * 
     * @public
     * @type {string}
     */
    public name: string;

    /**
     * The default settings of the plugin, which are used to generate the settings collection for the plugin.
     * Each setting object includes the `name` and `isPluginBound` properties.
     * 
     * @protected
     * @type {SettingDefinition[]}
     */
    protected defaultSettings: SettingDefinition[] = [
        { name: `left`, isPluginBound: false },
        { name: `top`, isPluginBound: false },
        { name: `text`, isPluginBound: true }
    ];

    /**
     * Retrieves the setting definitions of the plugin, which are used to generate the settings collection for the plugin.
     * 
     * @protected
     * @returns {SettingDefinitionCollection} A collection of setting definitions.
     */
    protected get settingDefinitions(): SettingDefinitionCollection {
        return new SettingDefinitionCollection(this.updateObjectAsync, ...this.defaultSettings);
    }

    /**
     * Creates a new instance of the FabricObjectPlugin class.
     * 
     * @param {string} name - The name of the plugin.
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Creates a new Fabric.js object asynchronously.
     * The object is initialized with the default value of the plugin.
     * 
     * @protected
     * @async
     * @returns {Promise<fabric.Object>} A promise that resolves to the created object.
     */
    protected async onCreationAsync(): Promise<fabric.Object> {
        const o = await this.createObjectAsync();
        const p = o as PluginObject;

        p.text = this.defaultValue;
        p.getSettings = getSettingCollectionSource(this.settingDefinitions, p);

        return p;
    }

    /**
     * Creates a new Fabric.js object asynchronously.
     * 
     * @public
     * @abstract
     * @async
     * @returns {Promise<fabric.Object>} A promise that resolves to the created object.
     */
    public abstract createObjectAsync(): Promise<fabric.Object>;

    /**
     * Updates an existing Fabric.js object asynchronously.
     * The object is updated with specific properties based on the plugin's configuration.
     * 
     * @public
     * @abstract
     * @async
     * @param {fabric.Object} object - The object to update.
     * @param {string} propertyName - The name of the property to update.
     * @returns {Promise<fabric.Object>} A promise that resolves to the updated object.
     */
    public abstract updateObjectAsync(object: fabric.Object, propertyName: string): Promise<fabric.Object>;

    /**
     * Retrieves the action for the plugin asynchronously.
     * The action is used to create a new object in the label designer and provides a user interface element (like a button).
     * 
     * @public
     * @async
     * @param {FabricObjectHandler} handler - The handler function for the plugin.
     * @returns {Promise<Action>} A promise that resolves to the action object.
     */
    public async getActionAsync(handler: FabricObjectHandler): Promise<Action> {
        return {
            id: `btn-${this.name}`,
            icon: `icon-${this.name}`,
            onClick: async () => handler(await this.onCreationAsync())
        };
    }
}
