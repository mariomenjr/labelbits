import JsBarcode from 'jsbarcode';

import { buildFabricSvgAsync, FabricSvg, PluginObject } from "@labelbits/designer-shared/fabric";

const barcodeDefaults: JsBarcode.Options = { format: `CODE128`, displayValue: true };

/**
 * This function asynchronously generates an SVG barcode image from a given value and format.
 *
 * @param {string} value - The value to encode in the barcode.
 * @param {string} format - The barcode format (e.g., CODE128, CODE39, etc.). Defaults to CODE128.
 * @returns {Promise<FabricSvg>} A promise that resolves to an object containing the generated SVG data and options.
 */
export async function generateBarcodeAsync(value: string): Promise<FabricSvg> {
    // Generate the barcode
    const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    JsBarcode(svg, value, barcodeDefaults);

    // Convert the SVG node to a string
    const serializer = new XMLSerializer();
    const barcodeSVG = serializer.serializeToString(svg);

    // Load the SVG string into Fabric.js
    return buildFabricSvgAsync(barcodeSVG);
}

/**
 * Regenerates a barcode object asynchronously based on the current value of the object in the specified property.
 * 
 * @param {PluginObject} pluginObject - The object to update.
 * @param {string} propertyName - The property name that triggered the update.
 * 
 * @returns {Promise<FabricSvg>} A promise that resolves to the generated SVG representation of the barcode.
 */
export async function regenerateBarcodeAsync(pluginObject: PluginObject, propertyName: string): Promise<FabricSvg> {

    const v = pluginObject.get(propertyName);
    switch (propertyName) {
        case `text`:
            return generateBarcodeAsync(v);

        default:
            throw new Error(`Not implemented property name ${propertyName} for plugin handler: ${regenerateBarcodeAsync.name}`);
    }
}