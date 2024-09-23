import QRCode from "qrcode";

import { buildFabricSvgAsync, FabricSvg, IPluginObject, PluginOptions } from "@labelbits/designer-shared/fabric";
import { SettingType } from "@labelbits/designer-shared/setting";

const qrcodeDefaults: QRCode.QRCodeToStringOptions = { type: `svg`, width: 125, margin: 0 };

/**
 * Generates a QR code object asynchronously from the given value and plugin options.
 * The QRCode library is used to generate the QR code SVG string.
 * The generated SVG string is then loaded into Fabric.js as a `FabricSvg` object.
 * @param {string} value - The value to encode into the QR code.
 * @param {PluginOptions} pluginOptions - The plugin options.
 * @returns {Promise<FabricSvg>} A promise that resolves to the `FabricSvg` object.
 */
export async function generateQrcodeAsync(value: string, pluginOptions: PluginOptions): Promise<FabricSvg> {
    // Generate an SVG string for the QR code with the specified value
    const svgStr = await QRCode.toString(value, qrcodeDefaults);

    // Load the SVG string into Fabric.js
    return buildFabricSvgAsync(svgStr, pluginOptions);
}

/**
 * Regenerates a QR code object asynchronously when a setting property is changed.
 * The object is updated by regenerating the QR code SVG string based on the new setting property value.
 * @param {IPluginObject} pluginObject - The object to be updated.
 * @param {string} propertyName - The name of the setting property that changed.
 * @returns {Promise<FabricSvg>} A promise that resolves to the updated object.
 */
export async function regenerateQrcodeAsync(pluginObject: IPluginObject, propertyName: string): Promise<FabricSvg> {

    const v = pluginObject.plugin[propertyName].value as SettingType;
    switch (propertyName) {
        case `text`:
            return generateQrcodeAsync(v as string, pluginObject.plugin);

        default:
            throw new Error(`Not implemented property name ${propertyName} for plugin handler: ${regenerateQrcodeAsync.name}`);
    }
}