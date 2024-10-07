import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import TextboxPlugin from "@labelbits/designer-plugin-textbox";
import BarcodePlugin from "@labelbits/designer-plugin-barcode";
import QrcodePlugin from "@labelbits/designer-plugin-qrcode";

type PluginLoaderType = new (...args: never[]) => FabricObjectPlugin;

/**
 * Labelbits configuration.
 * This is the root configuration for the Labelbits application.
 * It specifies the plugins to be used in the application.
 */
export default {
    /**
     * The list of plugins to be used in the application.
     * This list is used to load the plugins in the application.
     * @type {PluginLoaderType[]} - The list of plugins to be used.
     */
    pluginLoaders: [
        TextboxPlugin,
        BarcodePlugin,
        QrcodePlugin,

        // Add more plugins here if needed
    ] as PluginLoaderType[]
};

