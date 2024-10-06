import QRCode from "qrcode";

import { buildFabricSvgAsync, FabricSvg, PluginOptions } from "@labelbits/designer-shared/fabric";

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
    const svgStr = await QRCode.toString(value, { 
        ...PluginOptions.as<QRCode.QRCodeToStringOptions>(pluginOptions), 
        type: `svg`, 
        color: { dark: `#000`, light: `#0000` } 
    });

    // Load the SVG string into Fabric.js
    return buildFabricSvgAsync(svgStr, pluginOptions);
}
