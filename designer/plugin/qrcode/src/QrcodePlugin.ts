import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import { generateQrcodeAsync } from "./utils";
import { PluginObject, replaceSvg } from "@labelbits/designer-shared/fabric";

/**
 * QrcodePlugin class represents a plugin for creating QR code objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync method.
 */
export default class QrcodePlugin extends FabricObjectPlugin {

    /**
     * The default value for the QR code.
     */
    protected defaultValue: string = `https://labelbits.mariomenjr.com`;

    /**
     * Updates an existing QR code object asynchronously.
     * @param object The object to update.
     * @returns A promise that resolves to the updated object.
     */
    async updateObjectAsync(object: fabric.Object, propertyName: string): Promise<fabric.Object> {
        const pluginObject = object as PluginObject;

        // Generate the barcode SVG from the current content of the object
        const qrcodeSvg = await generateQrcodeAsync(pluginObject.text);

        return replaceSvg(object, qrcodeSvg);
    }
    /**
     * Creates a new QR code object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        // Load SVG string into Fabric.js
        const svgObject = await generateQrcodeAsync(this.defaultValue);

        // Group SVG objects into a single group object
        return fabric.util.groupSVGElements(svgObject.objects as fabric.Object[], svgObject.options);
    }
}

