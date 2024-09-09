import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import { generateQrcodeAsync } from "./utils";
import { PluginObject, replaceSvg } from "@labelbits/designer-shared/fabric";

/**
 * QrcodePlugin class represents a plugin for creating QR code objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync and updateObjectAsync methods.
 * @extends {FabricObjectPlugin}
 */
export default class QrcodePlugin extends FabricObjectPlugin {

    /**
     * The default value for the QR code content.
     */
    protected defaultValue: string = `https://labelbits.mariomenjr.com`;

    /**
     * Updates an existing QR code object asynchronously. This method likely retrieves data to update the QR code content before replacing the SVG.
     * @param object The QR code object to update.
     * @param propertyName The property name that triggered the update (not currently used).
     * @returns A promise that resolves to the updated QR code object.
     */
    async updateObjectAsync(object: fabric.Object, propertyName: string): Promise<fabric.Object> {
        const pluginObject = object as PluginObject;

        // Generate the barcode SVG from the current content of the object
        const qrcodeSvg = await generateQrcodeAsync(pluginObject.text);

        return replaceSvg(object, qrcodeSvg);
    }

    /**
     * Creates a new QR code object asynchronously. This method likely fetches data to populate the QR code content before generating the SVG.
     * @returns A promise that resolves to the created QR code object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        // Load SVG string into Fabric.js (likely generated from fetched data)
        const svgObject = await generateQrcodeAsync(this.defaultValue);

        // Group SVG objects into a single group object
        return fabric.util.groupSVGElements(svgObject.objects as fabric.Object[], svgObject.options);
    }
}
