import { classRegistry } from "fabric";

import { SettingProp } from "@labelbits/designer-shared/setting";
import { FabricSvg, PluginGroup, PluginOptions, replaceSvg } from "@labelbits/designer-shared/fabric";

import { generateBarcodeAsync, getDefaults } from "./utils";

/**
 * Represents a barcode object in the Fabric.js library.
 * This class extends the PluginGroup class and provides an implementation for updating the object
 * when the content of the barcode is changed.
 */
export class BarcodeObject extends PluginGroup {
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
    public plugin: PluginOptions = getDefaults();

    /**
     * Updates the object asynchronously when a setting property is changed.
     * The object is updated by regenerating the barcode SVG string based on the new setting property value.
     * @param {string} propName - The name of the setting property that changed.
     * @param {SettingProp} settingProp - The new setting property value.
     * @returns {Promise<BarcodeObject>} A promise that resolves to the updated object.
     */
    async updateObjectAsync(propName: string, settingProp: SettingProp): Promise<BarcodeObject> {
        console.debug(`Updating object with property name: ${propName} and setting property value: ${settingProp.value}`);

        const value = this.plugin.text.value as string;
        const barcodeSvg = await generateBarcodeAsync(value, this.plugin);

        return replaceSvg(this, barcodeSvg);
    }
}

classRegistry.setClass(BarcodeObject);
