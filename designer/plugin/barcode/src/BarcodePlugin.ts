import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { PluginObject } from "@labelbits/designer-shared/fabric";
import { generateBarcodeAsync } from "./utils";

/**
 * Represents a plugin for creating barcode objects in the Fabric.js library.
 */
export default class BarcodePlugin extends FabricObjectPlugin {

    async updateObjectAsync(object: fabric.Object): Promise<fabric.Object> {
        const pluginObject = object as PluginObject;

        const barcodeSvg = await generateBarcodeAsync(pluginObject.content);

        // If it's not a group, replace the entire object
        // If the object is a group (which SVGs typically are in Fabric.js)
        object.set({ objects: barcodeSvg.objects, ...barcodeSvg.options });

        const svgGroup = object as unknown as fabric.Group;
        
        // Remove old objects and add new ones
        svgGroup.remove(...svgGroup.getObjects());
        svgGroup.add(...barcodeSvg.objects);

        return object;
    }

    /**
     * Creates a new barcode object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {

        const svgOutput = await generateBarcodeAsync(`1234567890`);

        return fabric.util.groupSVGElements(svgOutput.objects, svgOutput.options);
    }
}
