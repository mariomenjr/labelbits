import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { PluginOptions, PluginMixin, IPluginObject, PluginConstructor } from "@labelbits/designer-shared/fabric";
import { SettingProp } from "@labelbits/designer-shared/setting";

const pluginOptions: PluginOptions = {
    left: { isNative: true },
    text: { isNative: true, value: `Edit me` },
};

class TextboxObject extends PluginMixin(fabric.Textbox) {
    static type = 'TextboxObject';

    public plugin: PluginOptions = pluginOptions;

    constructor(object: fabric.Textbox) {
        super(object.text, object);
    }

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
        return new TextboxObject(new fabric.Textbox(this.defaultValue, {
            /**
             * The width of the textbox.
             * @type {number}
             */
            width: 150,

            /**
             * The font size of the textbox.
             * @type {number}
             */
            fontSize: 16,
        }));
        
    }
}