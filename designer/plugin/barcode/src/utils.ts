import JsBarcode from 'jsbarcode';

import { buildFabricSvgAsync, FabricSvg, PluginOptions } from "@labelbits/designer-shared/fabric";

/**
 * Generates a barcode SVG string asynchronously from the given value and plugin options.
 * The JsBarcode library is used to generate the SVG string.
 * The generated SVG string is then loaded into Fabric.js as a `FabricSvg` object.
 * @param {string} value - The value to encode into the barcode.
 * @param {PluginOptions} pluginOptions - The plugin options.
 * @returns {Promise<FabricSvg>} A promise that resolves to the `FabricSvg` object.
 */
export async function generateBarcodeAsync(value: string, pluginOptions: PluginOptions): Promise<FabricSvg> {
    // Generate the barcode
    const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    
    JsBarcode(svg, value, {
        ...PluginOptions.as<JsBarcode.Options>(pluginOptions),
        background: `rgba(0,0,0,0)`
    });

    // Convert the SVG node to a string
    const serializer = new XMLSerializer();
    const barcodeSVG = serializer.serializeToString(svg);

    // Load the SVG string into Fabric.js
    return buildFabricSvgAsync(barcodeSVG, pluginOptions);
}
