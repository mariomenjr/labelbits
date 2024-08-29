import * as fabric from "fabric";
import JsBarcode from 'jsbarcode';

import FabricObjectPlugin from "../controllers/plugins/FabricObjectPlugin";
import { PluginObject } from "../utils/fabric";

type SvgOuput = {
    objects: fabric.Object[],
    options: Record<string, unknown>
};

async function generateBarcodeAsync(value: string, format: string = `CODE128`): Promise<SvgOuput> {
    // Generate the barcode
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    JsBarcode(svg, value, { format, displayValue: true });

    // Convert the SVG node to a string
    const serializer = new XMLSerializer();
    const barcodeSVG = serializer.serializeToString(svg);

    // Load the SVG string into Fabric.js
    const svgOutput = await fabric.loadSVGFromString(barcodeSVG);

    // Group the SVG objects into a single group object
    return { objects: svgOutput.objects as fabric.Object[], options: svgOutput.options };
}


/**
 * Represents a plugin for creating barcode objects in the Fabric.js library.
 */
export default class BarcodePlugin extends FabricObjectPlugin {

    async updateObjectAsync(object: fabric.Object): Promise<void> {
        const oo = object as PluginObject;
        
        const nsvg = await generateBarcodeAsync(oo.content);
        
        console.debug({object});

        const { left, top, scaleX, scaleY, angle, flipX, flipY } = object;

        // If it's not a group, replace the entire object
        // If the object is a group (which SVGs typically are in Fabric.js)
        object.set({
            objects: nsvg.objects,
            ...nsvg.options
        });
        const og = object as unknown as fabric.Group;
        // Remove old objects and add new ones
        og.remove(...og.getObjects());
        og.add(...nsvg.objects);

        object.set({
            left,
            top,
            scaleX,
            scaleY,
            angle,
            flipX,
            flipY
        });

        object.setCoords();
        object.canvas?.requestRenderAll();
        object.fire('modified');
    }

    /**
     * Creates a new barcode object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {

        const svgOutput = await generateBarcodeAsync("123456789");

        return fabric.util.groupSVGElements(svgOutput.objects, svgOutput.options);
    }
}
