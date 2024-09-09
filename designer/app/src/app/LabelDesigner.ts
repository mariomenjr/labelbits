import InteractiveCanvas from "@labelbits/designer-core/canvas";
import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";
import { FabricSelectionEventHandler } from "@labelbits/designer-shared/fabric";
import Settings from "./Settings";
import Toolbox from "./Toolbox";
import { loadPluginsAsync } from "../../labelbits.config";

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
    protected plugins: FabricObjectPlugin[] = [];

    /**
     * Creates an instance of LabelDesigner.
     *
     * @param {FabricObjectPlugin[]} plugins - The list of plugins registered in the label designer.
     * @protected
     */
    protected constructor(plugins: FabricObjectPlugin[]) {
        super();
        this.plugins = plugins;
    }

    /**
     * Creates a new instance of LabelDesigner with the specified plugins.
     *
     * @async
     * @static
     * @returns {Promise<LabelDesigner>} A promise that resolves to a new instance of LabelDesigner.
     */
    public static async createAsync(): Promise<LabelDesigner> {
        const plugins = await loadPluginsAsync();  // Load plugins asynchronously
        return new LabelDesigner(plugins);
    }

    /**
     * Retrieves the settings of the label designer.
     *
     * @returns {Settings} The settings of the label designer.
     */
    getSettings(): Settings {
        return new Settings((selectionHandler: FabricSelectionEventHandler) => {
            /**
             * Attaches event listeners to the canvas for selection events.
             * The selection events are used to update the settings of the label designer.
             */
            this.canvas.on("selection:created", selectionHandler);
            this.canvas.on("selection:updated", selectionHandler);
            this.canvas.on("selection:cleared", selectionHandler);
        });
    }

    /**
     * Retrieves the toolbox of the label designer.
     * The toolbox provides actions for manipulating the canvas objects.
     *
     * @async
     * @returns {Promise<Toolbox>} A promise that resolves to a Toolbox object.
     */
    async getToolboxAsync(): Promise<Toolbox> {
        /**
         * Get the actions from the plugins.
         * Actions are retrieved asynchronously using the getActionAsync method of each plugin.
         */
        const actionsAsync = this.plugins.map((p) => p.getActionAsync((o) => this.addObject(o)));

        /**
         * Wait for all the actions to be retrieved using Promise.all.
         */
        const actions = await Promise.all(actionsAsync);

        /**
         * Create a new Toolbox instance with the retrieved actions.
         */
        return new Toolbox(...actions);
    }
}
