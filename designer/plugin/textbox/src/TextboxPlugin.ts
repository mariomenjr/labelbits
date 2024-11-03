import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/models";
import { PluginOptions, PluginMixin } from "@labelbits/designer-shared/fabric";
import { SettingProp } from "@labelbits/designer-shared/setting";
import { getDefaults } from "./utils";

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
    public plugin: PluginOptions = getDefaults();

    /**
     * Updates the textbox object asynchronously.
     * The object is updated by regenerating the SVG string or properties based on the current plugin options.
     *
     * @async
     * @returns {Promise<TextboxObject>} A promise that resolves to the updated textbox object.
     */
    public async updateObjectAsync(): Promise<TextboxObject> {
        return this; // Nothing to do here.
    }
}

fabric.classRegistry.setClass(TextboxObject);

/**
 * Represents a plugin for creating and managing textbox objects in the Fabric.js library.
 * This plugin extends the FabricObjectPlugin class to provide specific functionality for textboxes.
 * @extends {FabricObjectPlugin}
 */
export default class TextboxPlugin extends FabricObjectPlugin {
    public name: string = `textbox`;
    
    /**
     * Creates a new textbox object asynchronously.
     * The object is created with the default value of the plugin.
     *
     * @async
     * @returns {Promise<TextboxObject>} A promise that resolves to the created textbox object.
     */
    async createObjectAsync(): Promise<TextboxObject> {
        const defaultOptions = getDefaults();
        const defaultValue = defaultOptions.text.value as string;

        const textOptions = PluginOptions.as<{}>(defaultOptions);
        return new TextboxObject(defaultValue, textOptions);
    }
}
