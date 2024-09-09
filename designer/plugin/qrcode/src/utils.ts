import QRCode from "qrcode";

import { buildFabricSvgAsync, FabricSvg, PluginObject } from "@labelbits/designer-shared/fabric";

const qrcodeDefaults: QRCode.QRCodeToStringOptions = { type: `svg`, width: 125, margin: 0 };

/**
 * Generates a QR code as an SVG and converts it into a format compatible with Fabric.js.
 * 
 * @param {string} value - The value to encode into the QR code.
 * 
 * @returns {Promise<FabricSvg>} A promise that resolves to an `SvgOuput` object containing the SVG representation
 *                               of the QR code, which includes Fabric.js objects and options.
 */
export async function generateQrcodeAsync(value: string): Promise<FabricSvg> {
    // Generate an SVG string for the QR code with the specified value
    const svgStr = await QRCode.toString(value, qrcodeDefaults);

    // Load the SVG string into Fabric.js
    return buildFabricSvgAsync(svgStr);
}

/**
 * Regenerates a QR code object asynchronously based on the current value of the object in the specified property.
 * 
 * @param {PluginObject} pluginObject - The object to update.
 * @param {string} propertyName - The property name that triggered the update.
 * 
 * @returns {Promise<FabricSvg>} A promise that resolves to the generated SVG representation of the QR code.
 */
export async function regenerateQrcodeAsync(pluginObject: PluginObject, propertyName: string): Promise<FabricSvg> {

    const v = pluginObject.get(propertyName);
    switch (propertyName) {
        case `text`:
            return generateQrcodeAsync(v);

        default:
            throw new Error(`Not implemented property name ${propertyName} for plugin handler: ${regenerateQrcodeAsync.name}`);
    }
}