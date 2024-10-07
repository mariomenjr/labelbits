import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import { generateQrcodeAsync, getDefaults } from "./utils";
import { QrcodeObject } from "./models";

/**
 * QrcodePlugin class represents a plugin for creating QR code objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync and updateObjectAsync methods.
 * @extends {FabricObjectPlugin}
 */
export default class QrcodePlugin extends FabricObjectPlugin {
    public name: string = `qrcode`;
    /**
     * Creates a new QR code object asynchronously.
     * The object is created with the default value of the plugin.
     * @async
     * @returns {Promise<QrcodeObject>} A promise that resolves to the created QR code object.
     */
    async createObjectAsync(): Promise<QrcodeObject> {
        const defaultOptions = getDefaults();
        const defaultValue = defaultOptions.text.value as string;

        // Load SVG string into Fabric.js (likely generated from fetched data)
        const svgObject = await generateQrcodeAsync(defaultValue, defaultOptions);

        // Group SVG objects into a single group object
        return new QrcodeObject(svgObject);
    }
}
