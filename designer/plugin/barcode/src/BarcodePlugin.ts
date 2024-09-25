import { classRegistry } from "fabric";

import { SettingProp } from "@labelbits/designer-shared/setting";
import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { FabricSvg, PluginGroup, PluginOptions, replaceSvg } from "@labelbits/designer-shared/fabric";

import { generateBarcodeAsync, regenerateBarcodeAsync } from "./utils";

const pluginOptions: PluginOptions = {
    text: { value: `1234567890`, isNative: false },
    displayValue: { value: true, isNative: false },
    format: { value: `CODE128`, isNative: false }
};

/**
 * Represents a barcode object in the Fabric.js library.
 * This class extends the PluginGroup class and provides an implementation for updating the object
 * when the content of the barcode is changed.
 */
class BarcodeObject extends PluginGroup {

    /**
     * The type of object that this represents.
     * This is a string that is used to identify the type of object.
     * @type {string}
     */
    static type: string = `BarcodeObject`;

    /**
     * The plugin options for this plugin.
     * This is a shortcut to the plugin options that are used to generate the barcode.
     * @type {PluginOptions}
     */
    public plugin: PluginOptions = pluginOptions;

    /**
     * Updates the object asynchronously when a setting property is changed.
     * The object is updated by regenerating the barcode SVG string based on the new setting property value.
     * @param {string} propName - The name of the setting property that changed.
     * @param {SettingProp} settingProp - The new setting property value.
     * @returns {Promise<BarcodeObject>} A promise that resolves to the updated object.
     */
    async updateObjectAsync(propName: string, settingProp: SettingProp): Promise<BarcodeObject> {

        const barcodeSvg = await regenerateBarcodeAsync(this, propName);

        return replaceSvg(this, barcodeSvg);
    }
}

classRegistry.setClass(BarcodeObject);

/**
 * Represents a plugin for creating barcode objects in the Fabric.js library.
 * This plugin provides an implementation for creating barcode objects and updating them
 * when the content of the barcode is changed.
 * @extends {FabricObjectPlugin}
 */
export default class BarcodePlugin extends FabricObjectPlugin {
    /**
     * The default value for the barcode when creating a new object.
     * @protected
     * @type {string}
     */
    protected defaultValue: string = pluginOptions.text.value as string;

    /**
     * Creates a new barcode object asynchronously.
     * The object is created with the default value of the plugin.
     * 
     * @async
     * @returns {Promise<BarcodeObject>} A promise that resolves to the created barcode object.
     */
    async createObjectAsync(): Promise<BarcodeObject> {

        // Generate the barcode SVG from the default value
        const svgOutput = await generateBarcodeAsync(this.defaultValue, pluginOptions);

        return new BarcodeObject(svgOutput);
    }
}