import * as fabric from "fabric";
import QRCode from "qrcode";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

/**
 * QrcodePlugin class represents a plugin for creating QR code objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync method.
 */
export default class QrcodePlugin extends FabricObjectPlugin {

    /**
     * The default value for the QR code.
     */
    protected defaultValue: string = `https://mariomenjr.com`;

    /**
     * Updates an existing QR code object asynchronously.
     * @param object The object to update.
     * @returns A promise that resolves to the updated object.
     */
    updateObjectAsync(_: fabric.FabricObject): Promise<fabric.Object> {
        throw new Error("Method not implemented.");
    }
    /**
     * Creates a new QR code object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        // Generate QR code as SVG string
        const svgStr = await QRCode.toString(this.defaultValue, { type: `svg` });

        // Load SVG string into Fabric.js
        const svgObject = await fabric.loadSVGFromString(svgStr);

        // Group SVG objects into a single group object
        const o = fabric.util.groupSVGElements(svgObject.objects as fabric.Object[], svgObject.options);

        // Scale the group object to desired height and width
        o.scaleToHeight(125);
        o.scaleToWidth(125);

        // Apply the selection style to the group object
        return o;
    }
}

