import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

/**
 * This type alias defines a function that asynchronously loads a FabricObjectPlugin.
 */
export type PluginLoader = () => Promise<FabricObjectPlugin>;

/**
 * An array containing functions that asynchronously load FabricObjectPlugin implementations.
 * Each function imports a plugin module and returns a new instance of the plugin with a specified name.
 */
const pluginLoaders: PluginLoader[] = [
    /**
     * Asynchronously loads the "text-plus" plugin from the "@labelbits/designer-plugin-textbox" package.
     * @returns {Promise<FabricObjectPlugin>} A promise that resolves to the loaded plugin instance.
     */
    async () => {
        const { default: plugin } = await import("@labelbits/designer-plugin-textbox");
        return new plugin("text-plus");
    },
    /**
     * Asynchronously loads the "barcode" plugin from the "@labelbits/designer-plugin-barcode" package.
     * @returns {Promise<FabricObjectPlugin>} A promise that resolves to the loaded plugin instance.
     */
    async () => {
        const { default: plugin } = await import("@labelbits/designer-plugin-barcode");
        return new plugin("barcode");
    },
    /**
     * Asynchronously loads the "qrcode-plus" plugin from the "@labelbits/designer-plugin-qrcode" package.
     * @returns {Promise<FabricObjectPlugin>} A promise that resolves to the loaded plugin instance.
     */
    async () => {
        const { default: plugin } = await import("@labelbits/designer-plugin-qrcode");
        return new plugin("qrcode-plus");
    },
]

/**
 * This function asynchronously loads all the plugins defined in the `pluginLoaders` array.
 * It uses Promise.all to wait for all plugins to load and then returns an array containing the loaded plugins.
 * 
 * @returns {Promise<FabricObjectPlugin[]>} A promise that resolves to an array of loaded FabricObjectPlugin instances.
 */
export async function loadPluginsAsync(): Promise<FabricObjectPlugin[]> {
    return await Promise.all(pluginLoaders.map(async (p) => await p()));
}