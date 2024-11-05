import { classRegistry } from "fabric";

import { PluginSvg, replaceSvg } from "@labelbits/designer-shared/fabric";

import { generateQrcodeAsync } from "./utils";

/**
 * QrcodeObject class represents a Fabric.js object that is generated from a QR code SVG string.
 * It extends the PluginSvg class and provides an implementation for the updateObjectAsync method.
 * @extends {PluginSvg}
 */
export class QrcodeObject extends PluginSvg {

    /**
     * The type of the object.
     * @type {string}
     */
    static type: string = `QrcodeObject`;

    /**
     * Asynchronously regenerates the QR code SVG string for the object.
     * The object is updated by generating a new QR code SVG based on the current plugin options.
     * 
     * @async
     * @returns {Promise<QrcodeObject>} A promise that resolves to the updated QR code object.
     */
    public async updateObjectAsync(): Promise<QrcodeObject> {
        
        const value = this.plugin.text.value as string;
        const qrcodeSvg = await generateQrcodeAsync(value, this.plugin);

        return replaceSvg(this, qrcodeSvg);
    }
}

classRegistry.setClass(QrcodeObject);
