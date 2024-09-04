import * as fabric from "fabric";
import JsBarcode from 'jsbarcode';

import { FabricObjectPlugin } from "@labelbits/designer-core/plugins";

/**
 * Represents a plugin for creating barcode objects in the Fabric.js library.
 */
export default class BarcodePlugin extends FabricObjectPlugin {
    /**
     * Creates a new barcode object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        // Generate the barcode
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        JsBarcode(svg, "barcode", { format: "CODE128", displayValue: true });

        // Convert the SVG node to a string
        const serializer = new XMLSerializer();
        const barcodeSVG = serializer.serializeToString(svg);   

        // Load the SVG string into Fabric.js
        const svgOutput = await fabric.loadSVGFromString(barcodeSVG);

        // Group the SVG objects into a single group object
        return fabric.util.groupSVGElements(svgOutput.objects as fabric.Object[], svgOutput.options);
    }
}
