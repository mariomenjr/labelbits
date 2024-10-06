import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import { generateBarcodeAsync, getDefaults } from "./utils";
import { BarcodeObject } from "./models";

/**
 * Represents a plugin for creating barcode objects in the Fabric.js library.
 * This plugin provides an implementation for creating barcode objects and updating them
 * when the content of the barcode is changed.
 * @extends {FabricObjectPlugin}
 */
export default class BarcodePlugin extends FabricObjectPlugin {
    /**
     * Creates a new barcode object asynchronously.
     * The object is created with the default value of the plugin.
     * 
     * @async
     * @returns {Promise<BarcodeObject>} A promise that resolves to the created barcode object.
     */
    async createObjectAsync(): Promise<BarcodeObject> {
        const defaultOptions = getDefaults();
        const defaultValue = defaultOptions.text.value as string;

        // Generate the barcode SVG from the default value
        const svgOutput = await generateBarcodeAsync(defaultValue, defaultOptions);

        return new BarcodeObject(svgOutput);
    }
}