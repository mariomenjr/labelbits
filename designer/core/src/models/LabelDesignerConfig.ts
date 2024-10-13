import FabricObjectPlugin from "./FabricObjectPlugin";

/**
 * Represents a plugin loader type.
 * @type {PluginLoader}
 */
export type PluginLoader = new (...args: never[]) => FabricObjectPlugin;

/**
 * Represents the configuration for the Labelbits application.
 * This is the root configuration for the Labelbits application.
 * It specifies the plugins to be used in the application.
 * @type {DesignerConfig}
 */
export type DesignerConfig = {
    /**
     * The list of plugins to be used in the application.
     * This list is used to load the plugins in the application.
     * @type {PluginLoaderType[]} - The list of plugins to be used.
     */
    pluginLoaders: PluginLoader[]
};