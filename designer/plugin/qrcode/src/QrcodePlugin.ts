import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import { generateQrcodeAsync } from "./utils";
import { pluginOptions } from "./defaults";
import { QrcodeObject } from "./models";

/**
 * QrcodePlugin class represents a plugin for creating QR code objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync and updateObjectAsync methods.
 * @extends {FabricObjectPlugin}
 */
export default class QrcodePlugin extends FabricObjectPlugin {

    /**
     * The default value of the plugin.
     * This value is used when creating a new QR code object.
     */
    protected defaultValue: string = pluginOptions.text.value as string;

    /**
     * Creates a new QR code object asynchronously.
     * The object is created with the default value of the plugin.
     * @async
     * @returns {Promise<QrcodeObject>} A promise that resolves to the created QR code object.
     */
    async createObjectAsync(): Promise<QrcodeObject> {
        // Load SVG string into Fabric.js (likely generated from fetched data)
        const svgObject = await generateQrcodeAsync(this.defaultValue, pluginOptions);

        // Group SVG objects into a single group object
        return new QrcodeObject(svgObject);
    }
}
