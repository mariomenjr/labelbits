import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { PluginObject, replaceSvg } from "@labelbits/designer-shared/fabric";

import { generateBarcodeAsync, regenerateBarcodeAsync } from "./utils";

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
    protected defaultValue: string = `1234567890`;

    /**
     * Updates an existing barcode object asynchronously.
     * This method is called when the content of the barcode is changed.
     * It updates the object by generating a new barcode SVG from the current content of the object,
     * and then sets the options of the object from the SVG.
     * 
     * @async
     * @param {fabric.Object} object - The object to update.
     * @param {string} propertyName - The name of the property that was changed.
     * @returns {Promise<fabric.Object>} A promise that resolves to the updated object.
     * @throws {Error} If there's an issue generating the barcode or updating the object.
     */
    async updateObjectAsync(object: fabric.Object, propertyName: string): Promise<fabric.Object> {
        const pluginObject = object as PluginObject;
        // Generate the barcode SVG from the current content of the object
        const barcodeSvg = await regenerateBarcodeAsync(pluginObject, propertyName);
        return replaceSvg(object, barcodeSvg);
    }

    /**
     * Creates a new barcode object asynchronously.
     * It generates a new barcode SVG from the default value and then creates a new group object
     * with the generated SVG elements.
     * 
     * @async
     * @returns {Promise<fabric.Object>} A promise that resolves to the created object.
     * @throws {Error} If there's an issue generating the barcode or creating the object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        // Generate the barcode SVG from the default value
        const svgOutput = await generateBarcodeAsync(this.defaultValue);
        // Create a new group object with the generated SVG elements
        return fabric.util.groupSVGElements(svgOutput.objects, svgOutput.options);
    }
}