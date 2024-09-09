import * as fabric from "fabric";
import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { SettingDefinition } from "@labelbits/designer-shared/setting";

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
    protected defaultValue: string = `New text`;

    /**
     * The default settings for the textbox plugin.
     * These settings are derived from the parent class and modified to set isPluginBound to false.
     * @protected
     * @type {SettingDefinition[]}
     */
    protected defaultSettings: SettingDefinition[] = super.settingDefinitions.map(sd => {
        sd.isPluginBound = false;
        return sd;
    });

    /**
     * Updates an existing textbox object asynchronously.
     * This method is called when the content of the textbox is changed.
     * It updates the object by setting the new value of the textbox.
     * @param {fabric.FabricObject} _ - The object to update (unused in this implementation).
     * @param {string} propertyName - The name of the property that was changed.
     * @returns {Promise<fabric.Object>} A promise that resolves to the updated object.
     * @throws {Error} Always throws an error as the method is not implemented.
     */
    updateObjectAsync(_: fabric.FabricObject, propertyName: string): Promise<fabric.Object> {
        throw new Error("Method not implemented.");
    }

    /**
     * Creates a new textbox object asynchronously.
     * The object is created with the default value of the plugin.
     * @async
     * @returns {Promise<fabric.Object>} A promise that resolves to the created textbox object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        return new fabric.Textbox(this.defaultValue, {
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
        });
    }
}