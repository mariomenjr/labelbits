import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { PluginObject } from "@labelbits/designer-shared/fabric";
import { generateBarcodeAsync } from "./utils";

/**
 * Represents a plugin for creating barcode objects in the Fabric.js library.
 */
export default class BarcodePlugin extends FabricObjectPlugin {
    /**
     * The default value for the barcode when creating a new object.
     */
    protected defaultValue: string = `1234567890`;

    /**
     * Updates an existing barcode object asynchronously.
     * This method is called when the content of the barcode is changed.
     * @param object The object to update.
     * @returns A promise that resolves to the updated object.
     */
    async updateObjectAsync(object: fabric.Object): Promise<fabric.Object> {
        const pluginObject = object as PluginObject;

        // Generate the barcode SVG from the current content of the object
        const barcodeSvg = await generateBarcodeAsync(pluginObject.content);

        // Set the options of the object from the SVG
        object.set({
            // Set the objects of the group to the SVG elements
            objects: barcodeSvg.objects,
            // Set the other options from the SVG
            ...barcodeSvg.options,
        });

        // Remove all the current objects from the group
        const svgGroup = object as unknown as fabric.Group;
        svgGroup.remove(...svgGroup.getObjects());

        // Add the new SVG elements to the group
        svgGroup.add(...barcodeSvg.objects);

        return object;
    }

    /**
     * Creates a new barcode object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        // Generate the barcode SVG from the default value
        const svgOutput = await generateBarcodeAsync(this.defaultValue);

        // Create a new group object with the generated SVG elements
        return fabric.util.groupSVGElements(svgOutput.objects, svgOutput.options);
    }
}

