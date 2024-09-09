import * as fabric from "fabric";
import QRCode from "qrcode";

import { SvgOuput } from "@labelbits/designer-shared/fabric";

export async function generateQrcodeAsync(value: string): Promise<SvgOuput> {
    const svgStr = await QRCode.toString(value, { type: `svg`, width: 125, margin: 0 });

    // Load SVG string into Fabric.js
    const svgObject = await fabric.loadSVGFromString(svgStr);

    return {
        objects: svgObject.objects as fabric.Object[],
        options: svgObject.options
    };
}