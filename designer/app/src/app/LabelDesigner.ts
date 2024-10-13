import InteractiveCanvas from "@labelbits/designer-core/canvas";
import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

import Settings from "./Settings";
import Toolbox from "./Toolbox";

import config from "../../labelbits.config";

/**
 * The LabelDesigner class represents the main label designer application.
 * It extends from InteractiveCanvas to provide an interactive design environment.
 *
 * @class
 * @extends {InteractiveCanvas}
 */
export default class LabelDesigner extends InteractiveCanvas {

    /**
     * The list of plugins registered in the label designer.
     *
     * @type {FabricObjectPlugin[]}
     * @protected
     */
    protected readonly plugins: FabricObjectPlugin[] = [];

    /**
     * The toolbox instance.
     * 
     * @type {Toolbox}
     */
    public readonly toolbox: Toolbox = new Toolbox();
    /**
     * The settings instance.
     * 
     * @type {Settings}
     */
    public readonly settings: Settings = new Settings();

    /**
     * Creates a new instance of LabelDesigner with the specified plugins.
     *
     * @async
     * @static
     * @returns {Promise<LabelDesigner>} A promise that resolves to a new instance of LabelDesigner.
     */
    public static async createAsync(): Promise<LabelDesigner> {
        const ld = new LabelDesigner();
        
        await ld.loadPluginsAsync();
        await ld.loadToolboxAsync();

        console.debug(`Label designer created.`);
        return ld;
    }

    /**
     * Loads the plugins registered in the label designer configuration.
     * 
     * This method is called internally by the constructor and should not be called directly.
     * 
     * @async
     * @protected
     * @returns {Promise<void>} A promise that resolves when all plugins are loaded.
     */
    protected async loadPluginsAsync(): Promise<void> {
        // Load the plugins registered in the label designer configuration.
        for (let i = 0; i < config.pluginLoaders.length; i++) {
            this.plugins.push(new config.pluginLoaders[i]());
        }
        console.debug(`Label designer plugins loaded.`);
    }

    /**
     * Retrieves the toolbox of the label designer.
     * The toolbox provides actions for manipulating the canvas objects.
     *
     * @async
     * @returns {Promise<void>} A promise that resolves to a Toolbox object.
     */
    public async loadToolboxAsync(): Promise<void> {
        /**
         * Get the actions from the plugins.
         * Actions are retrieved asynchronously using the getActionAsync method of each plugin.
         */
        const actionsAsync = this.plugins.map((p) => p.getActionAsync((o) => this.add(o)));

        /**
         * Wait for all the actions to be retrieved using Promise.all.
         */
        const actions = await Promise.all(actionsAsync);

        /**
         * Add the actions to the toolbox.
         * The actions are added asynchronously using the push method of the toolbox.
         */
        this.toolbox.push(...actions);

        console.debug(`Label designer toolbox loaded.`);
    }
}
