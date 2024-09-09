import { SvgOuput } from "@labelbits/designer-shared/fabric";
import * as fabric from "fabric";
import JsBarcode from 'jsbarcode';

/**
 * This function asynchronously generates an SVG barcode image from a given value and format.
 *
 * @param {string} value - The value to encode in the barcode.
 * @param {string} format - The barcode format (e.g., CODE128, CODE39, etc.). Defaults to CODE128.
 * @returns {Promise<SvgOuput>} A promise that resolves to an object containing the generated SVG data and options.
 */
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