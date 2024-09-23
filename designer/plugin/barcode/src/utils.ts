import JsBarcode from 'jsbarcode';

import { buildFabricSvgAsync, FabricSvg, IPluginObject, PluginOptions } from "@labelbits/designer-shared/fabric";
import { SettingType } from '@labelbits/designer-shared/setting';

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
    JsBarcode(svg, value, PluginOptions.as<JsBarcode.Options>(pluginOptions));

    // Convert the SVG node to a string
    const serializer = new XMLSerializer();
    const barcodeSVG = serializer.serializeToString(svg);

    // Load the SVG string into Fabric.js
    return buildFabricSvgAsync(barcodeSVG, pluginOptions);
}

/**
 * Regenerates a barcode object asynchronously when a setting property is changed.
 * The object is updated by regenerating the barcode SVG string based on the new setting property value.
 * @param {IPluginObject} pluginObject - The object to be updated.
 * @param {string} propertyName - The name of the setting property that changed.
 * @returns {Promise<FabricSvg>} A promise that resolves to the updated object.
 */
export async function regenerateBarcodeAsync(pluginObject: IPluginObject, propertyName: string): Promise<FabricSvg> {
    
    const v = pluginObject.plugin[propertyName].value as SettingType;

    switch (propertyName) {
        case `text`:
            return generateBarcodeAsync(v as string, pluginObject.plugin);

        case `format`:
        case `displayValue`:
            const vt = pluginObject.plugin.text.value as string;
            return generateBarcodeAsync(vt, pluginObject.plugin);

        default:
            throw new Error(`Not implemented property name ${propertyName} for plugin handler: ${regenerateBarcodeAsync.name}`);
    }
}