import { FabricObjectPlugin } from "@labelbits/designer-core/plugins";

import BarcodePlugin from "@labelbits/designer-plugin-barcode";
import QrcodePlugin from "@labelbits/designer-plugin-qrcode";
import TextboxPlugin from "@labelbits/designer-plugin-textbox";

/**
 * Retrieves the list of plugins for the application.
 * 
 * @returns An array of FabricObjectPlugin objects representing the plugins.
 */
export function getPlugins(): FabricObjectPlugin[] {
    // Create instances of the plugins and return them as an array
    return [
        /**
         * Creates a new TextboxPlugin object with the name "text-plus".
         */
        new TextboxPlugin(`text-plus`),

        /**
         * Creates a new BarcodePlugin object with the name "barcode".
         */
        new BarcodePlugin(`barcode`),

        /**
         * Creates a new QrcodePlugin object with the name "qrcode-plus".
         */
        new QrcodePlugin(`qrcode-plus`),
    ];
}
