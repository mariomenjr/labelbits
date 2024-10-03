import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { PluginOptions, PluginMixin } from "@labelbits/designer-shared/fabric";
import { SettingProp } from "@labelbits/designer-shared/setting";

import { pluginOptions } from "./defaults";

/**
 * Represents a Fabric.js Textbox object with plugin-specific properties.
 * It extends the PluginMixin class to provide a standard implementation for the plugin.
 * @extends {PluginMixin<fabric.Textbox>}
 */
class TextboxObject extends PluginMixin(fabric.Textbox) {
    /**
     * The type of the object.
     * This property is used to determine the type of the object when it is created or loaded.
     * @type {string}
     */
    static type: string = 'TextboxObject';

    /**
     * The default options for the object.
     * These options are used when creating a new object.
     * @type {PluginOptions}
     */
    public plugin: PluginOptions = pluginOptions;

    /**
     * Updates the object asynchronously when a setting property is changed.
     * The object is updated by using the new setting property value.
     * @param {string} propName - The name of the setting property that changed.
     * @param {SettingProp} _ - The new setting property value.
     * @returns {Promise<TextboxObject>} A promise that resolves to the updated object.
     */
    public async updateObjectAsync(propName: string, _: SettingProp): Promise<TextboxObject> {
        throw new Error(`Not implemented property name ${propName} for plugin handler: ${TextboxObject.prototype.updateObjectAsync.name}`);
    }
}

fabric.classRegistry.setClass(TextboxObject);

/**
 * Represents a plugin for creating and managing textbox objects in the Fabric.js library.
 * This plugin extends the FabricObjectPlugin class to provide specific functionality for textboxes.
 * @extends {FabricObjectPlugin}
 */
export default class TextboxPlugin extends FabricObjectPlugin {
    /**
     * The default value for the textbox when creating a new object.
     * @protected
     * @type {string}
     */
    protected defaultValue: string = pluginOptions.text.value as string;

    /**
     * Creates a new textbox object asynchronously.
     * The object is created with the default value of the plugin.
     *
     * @async
     * @returns {Promise<TextboxObject>} A promise that resolves to the created textbox object.
     */
    async createObjectAsync(): Promise<TextboxObject> {
        const textOptions = PluginOptions.as<{}>(pluginOptions);
        return new TextboxObject(this.defaultValue, textOptions);
    }
}
