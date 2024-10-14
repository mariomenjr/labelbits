import { classRegistry } from "fabric";

import { PluginSvg, PluginOptions, replaceSvg, FabricSvg } from "@labelbits/designer-shared/fabric";
import { SettingProp } from "@labelbits/designer-shared/setting";

import { generateQrcodeAsync, getDefaults } from "./utils";

/**
 * QrcodeObject class represents a Fabric.js object that is generated from a QR code SVG string.
 * It extends the PluginSvg class and provides an implementation for the updateObjectAsync method.
 * @extends {PluginSvg}
 */
export class QrcodeObject extends PluginSvg {

    /**
     * The type of the object.
     * @type {string}
     */
    static type: string = `QrcodeObject`;

    /**
     * The plugin options for this plugin.
     * This is a shortcut to the plugin options that are used to generate the QR code.
     * @type {PluginOptions}
     */
    public plugin: PluginOptions = getDefaults();

    /**
     * Updates the object asynchronously when a setting property is changed.
     * The object is updated by regenerating the QR code SVG string based on the new setting property value.
     * 
     * @async
     * @param {string} propName - The name of the setting property that changed.
     * @param {SettingProp} settingProp - The new setting property value.
     * @returns {Promise<QrcodeObject>} A promise that resolves to the updated object.
     */
    async updateObjectAsync(propName: string, settingProp: SettingProp): Promise<QrcodeObject> {
        console.debug(`Updating object with property name: ${propName} and setting property value: ${settingProp.value}`);

        const value = this.plugin.text.value as string;
        const qrcodeSvg = await generateQrcodeAsync(value, this.plugin);

        return replaceSvg(this, qrcodeSvg);
    }
}

classRegistry.setClass(QrcodeObject);
