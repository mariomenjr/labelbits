import { TMat2D } from "fabric";
import { GenericHandler } from "@labelbits/designer-shared";

import InteractiveCanvas from "../bases/InteractiveCanvas";

import Settings from "./Settings";
import Toolbox from "./Toolbox";

import { DesignerConfig, FabricObjectPlugin, PluginLoader } from "../models";

/**
 * The LabelDesigner class represents the main label designer application.
 * It extends from InteractiveCanvas to provide an interactive design environment.
 *
 * @class
 * @extends {InteractiveCanvas}
 */
export default class LabelDesigner extends InteractiveCanvas {
    /**
     * The default transform matrix.
     * 
     * @type {TMat2D}
     * @static
     * @readonly
     */
    static readonly DEFAULT_TRANSFORM: TMat2D = [1, 0, 0, 1, 0, 0];

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
    public static async createAsync(config: DesignerConfig): Promise<LabelDesigner> {
        const ld = new LabelDesigner();

        await ld.loadPluginsAsync(config.pluginLoaders);
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
    protected async loadPluginsAsync(pluginLoaders: PluginLoader[]): Promise<void> {
        // Load the plugins registered in the label designer configuration.
        for (let i = 0; i < pluginLoaders.length; i++) {
            this.plugins.push(new pluginLoaders[i]());
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

        // Add the actions to the toolbox
        actions.push({
            id: 'download',
            icon: 'download',
            onClick: () => this.downloadAsync()
        });

        /**
         * Add the actions to the toolbox.
         * The actions are added asynchronously using the push method of the toolbox.
         */
        this.toolbox.push(...actions);

        console.debug(`Label designer toolbox loaded.`);
    }

    /**
     * Downloads the current canvas as a PNG image.
     *
     * @async
     * @returns {Promise<void>} A promise that resolves when the image is downloaded.
     */
    public downloadAsync(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Save the current viewport transform
            const vt = this.viewportTransform;
            try {
                // Set the viewport transform to identity
                this.viewportTransform = LabelDesigner.DEFAULT_TRANSFORM;

                // Create an anchor element to download the image
                const a = document.createElement(`a`);
                const ops = {
                    quality: 1,
                    multiplier: 1,
                    top: this.labelArea.top,
                    left: this.labelArea.left,
                    width: this.labelArea.width,
                    height: this.labelArea.height,
                };

                // Download the image
                a.href = this.toDataURL(ops);
                a.download = `canvas.${Date.now()}.png`;
                a.click();
                
                // Restore the viewport transform
                this.viewportTransform = vt;
                resolve();
            } catch (e) {

                this.viewportTransform = vt;
                reject(e);
            }
        });
    }
}
