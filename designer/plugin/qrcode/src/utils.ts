import * as fabric from "fabric";
import QRCode from "qrcode";

import { SvgOuput } from "@labelbits/designer-shared/fabric";

/**
 * Generates a QR code as an SVG and converts it into a format compatible with Fabric.js.
 * 
 * @param {string} value - The value to encode into the QR code.
 * 
 * @returns {Promise<SvgOuput>} A promise that resolves to an `SvgOuput` object containing the SVG representation
 *                             of the QR code, which includes Fabric.js objects and options.
 */
export async function generateQrcodeAsync(value: string): Promise<SvgOuput> {
    // Generate an SVG string for the QR code with the specified value
    const svgStr = await QRCode.toString(value, { type: `svg`, width: 125, margin: 0 });

    // Load the SVG string into Fabric.js
    const svgObject = await fabric.loadSVGFromString(svgStr);

    // Return the SVG objects and options in the format expected by the application
    return {
        objects: svgObject.objects as fabric.Object[],
        options: svgObject.options
    };
}
