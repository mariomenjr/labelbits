import { SettingProp } from "@labelbits/designer-shared/setting";
import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { FabricSvg, PluginGroup, PluginOptions, replaceSvg } from "@labelbits/designer-shared/fabric";

import { generateQrcodeAsync, regenerateQrcodeAsync } from "./utils";

const pluginOptions: PluginOptions = {
    left: { isNative: true },
    text: { isNative: false, value: `https://mariomenjr.com` },
};

class QrcodeObject extends PluginGroup {

    static type = `QrcodeObject`;

    constructor(object: FabricSvg) {
        super(object);
    }

    /**
     * The plugin options for this plugin.
     * This is a shortcut to the plugin options that are used to generate the barcode.
     * @type {PluginOptions}
     */
    public plugin: PluginOptions = pluginOptions;

    /**
     * Updates the object asynchronously when a setting property is changed.
     * The object is updated by regenerating the QR code SVG string based on the new setting property value.
     * @param {string} propName - The name of the setting property that changed.
     * @param {SettingProp} settingProp - The new setting property value.
     * @returns {Promise<QrcodeObject>} A promise that resolves to the updated object.
     */
    async updateObjectAsync(propName: string, settingProp: SettingProp): Promise<QrcodeObject> {

        const qrcodeSvg = await regenerateQrcodeAsync(this, propName);
        return replaceSvg(this, qrcodeSvg);
    }
}

/**
 * QrcodePlugin class represents a plugin for creating QR code objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync and updateObjectAsync methods.
 * @extends {FabricObjectPlugin}
 */
export default class QrcodePlugin extends FabricObjectPlugin {

    /**
     * The default value of the plugin.
     * This value is used when creating a new QR code object.
     */
    protected defaultValue: string = pluginOptions.text.value as string;

    /**
     * Creates a new QR code object asynchronously.
     * The object is created with the default value of the plugin.
     * @async
     * @returns {Promise<QrcodeObject>} A promise that resolves to the created QR code object.
     */
    async createObjectAsync(): Promise<QrcodeObject> {
        // Load SVG string into Fabric.js (likely generated from fetched data)
        const svgObject = await generateQrcodeAsync(this.defaultValue, pluginOptions);

        // Group SVG objects into a single group object
        return new QrcodeObject(svgObject);
    }
}
