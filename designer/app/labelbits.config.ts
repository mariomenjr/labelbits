import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

export type PluginLoader = () => Promise<FabricObjectPlugin>;

const pluginLoaders: PluginLoader[] = [
    async () => {
        const { default: plugin } = await import("@labelbits/designer-plugin-textbox")
        return new plugin("text-plus");
    },
    async () => {
        const { default: plugin } = await import("@labelbits/designer-plugin-barcode");
        return new plugin("barcode");
    },
    async () => {
        const { default: plugin } = await import("@labelbits/designer-plugin-qrcode")
        return new plugin("qrcode-plus");
    },
]

export async function loadPluginsAsync(): Promise<FabricObjectPlugin[]> {
    return await Promise.all(pluginLoaders.map(async (p) => await p()));
}
