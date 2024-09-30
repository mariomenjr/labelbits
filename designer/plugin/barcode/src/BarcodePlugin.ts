import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import { generateBarcodeAsync } from "./utils";
import { BarcodeObject } from "./models";
import { defaultOptions } from "./defaults";

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
    protected defaultValue: string = defaultOptions.text.value as string;

    /**
     * Creates a new barcode object asynchronously.
     * The object is created with the default value of the plugin.
     * 
     * @async
     * @returns {Promise<BarcodeObject>} A promise that resolves to the created barcode object.
     */
    async createObjectAsync(): Promise<BarcodeObject> {

        // Generate the barcode SVG from the default value
        const svgOutput = await generateBarcodeAsync(this.defaultValue, defaultOptions);

        return new BarcodeObject(svgOutput);
    }
}