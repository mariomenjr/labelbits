import * as fabric from "fabric";

import { SettingDefinition, SettingDefinitionCollection, getSettingCollectionSource } from "@labelbits/designer-shared/setting";
import { PluginObject, FabricObjectHandler, } from "@labelbits/designer-shared/fabric";
import { Plugin, Action } from "@labelbits/designer-shared";

/**
 * Represents a plugin for objects in the Fabric.js library.
 * It provides an abstract base class for creating plugins that can be used in the application.
 */
export default abstract class FabricObjectPlugin implements Plugin<FabricObjectHandler> {

    /**
     * The default value of the plugin, which is used when creating a new object.
     */
    protected abstract defaultValue: string;

    /**
     * The name of the plugin.
     */
    public name: string;

    /**
     * The default settings of the plugin, which are used to generate the settings collection for the plugin.
     * The settings are an array of objects, each with the following properties:
     * {
     *   name: string,
     *   isPluginBound: boolean
     * }
     * The `isPluginBound` property is a boolean flag indicating whether the setting is bound to the plugin.
     */
    protected defaultSettings: SettingDefinition[] = [
        {
            /**
             * The name of the setting.
             */
            name: `left`,
            /**
             * Whether the setting is bound to the plugin.
             */
            isPluginBound: false
        },
        {
            name: `top`,
            isPluginBound: false
        },
        {
            name: `text`,
            isPluginBound: true
        }
    ];

    /**
     * Retrieves the setting definitions of the plugin, which are used to generate the settings collection for the plugin.
     * @returns A promise that resolves to the setting definitions.
     */
    protected get settingDefinitions(): SettingDefinitionCollection {
        return new SettingDefinitionCollection(this.updateObjectAsync, ...this.defaultSettings);
    }

    /**
     * Creates a new instance of the FabricObjectPlugin class.
     * @param name The name of the plugin.
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Creates a new Fabric.js object asynchronously.
     * The object is created with the default value of the plugin.
     * @returns A promise that resolves to the created object.
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
     * @returns A promise that resolves to the created object.
     */
    public abstract createObjectAsync(): Promise<fabric.Object>;

    /**
     * Updates an existing Fabric.js object asynchronously.
     * The object is updated with the properties of the plugin.
     * @param object The object to update.
     * @returns A promise that resolves to the updated object.
     */
    public abstract updateObjectAsync(object: fabric.Object, propertyName: string): Promise<fabric.Object>;

    /**
     * Retrieves the action for the plugin asynchronously.
     * The action is used to create a new object in the label designer.
     * @param handler The handler function for the plugin.
     * @returns A promise that resolves to the action.
     */
    public async getActionAsync(handler: FabricObjectHandler): Promise<Action> {
        return {
            // The id of the action
            id: `btn-${this.name}`,
            // The icon of the action
            icon: `icon-${this.name}`,
            // The onClick event handler for the action
            onClick: async () => handler(await this.onCreationAsync())
        };
    }
}

