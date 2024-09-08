import * as fabric from "fabric";
import JsBarcode from 'jsbarcode';

export type SvgOuput = {
    objects: fabric.Object[],
    options: Record<string, unknown>
};

export async function generateBarcodeAsync(value: string, format: string = `CODE128`): Promise<SvgOuput> {
    // Generate the barcode
    const svg = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
    JsBarcode(svg, value, { format, displayValue: true });

    // Convert the SVG node to a string
    const serializer = new XMLSerializer();
    const barcodeSVG = serializer.serializeToString(svg);

    // Load the SVG string into Fabric.js
    const svgOutput = await fabric.loadSVGFromString(barcodeSVG);

    // Group the SVG objects into a single group object
    return { objects: svgOutput.objects as fabric.Object[], options: svgOutput.options };
}
