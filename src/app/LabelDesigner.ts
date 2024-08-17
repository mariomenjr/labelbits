import Zoom from "../controllers/canvas/Zoom";
import FabricObjectPlugin from "../controllers/plugins/FabricObjectPlugin";

import { getPlugins } from "../plugins";

import Settings from "./Settings";
import Toolbox from "./Toolbox";

import { FabricSelectionEventHandler } from "../utils/handlers";

/**
 * The LabelDesigner class represents the main label designer application.
 * It provides methods to register plugins, start the application, get settings, and get the toolbox.
 */
export default class LabelDesigner extends Zoom {

    /**
     * The list of plugins registered in the label designer.
     */
    protected plugins: FabricObjectPlugin[] = getPlugins();

    /**
     * Retrieves the settings of the label designer.
     * It returns an instance of the Settings class, which encapsulates the active objects from the canvas.
     *
     * @returns {Settings} The settings of the label designer.
     */
    /**
     * Retrieves the settings of the label designer.
     * It returns an instance of the Settings class, which encapsulates the active objects from the canvas.
     *
     * @returns {Settings} The settings of the label designer.
     */
    getSettings(): Settings {
        return new Settings((selectionHandler: FabricSelectionEventHandler) => {
            /**
             * Attach event listeners to the canvas for selection events.
             * The selection events are used to update the settings of the label designer.
             */
            this.canvas.on("selection:created", selectionHandler);
            this.canvas.on("selection:updated", selectionHandler);
            this.canvas.on("selection:cleared", selectionHandler);
        });
    }

    /**
     * Retrieves the toolbox of the label designer.
     * It returns a promise that resolves to a Toolbox object.
     * @returns A promise that resolves to a Toolbox object.
     */
    async getToolboxAsync(): Promise<Toolbox> {

        /**
         * Get the actions from the plugins.
         * The actions are retrieved asynchronously using the getActionAsync method of the plugins.
         */
        const actionsAsync = this.plugins.map((p) => p.getActionAsync((o) => this.addObject(o)));

        /**
         * Wait for all the actions to be retrieved.
         * The actions are retrieved using the Promise.all method.
         */
        const actions = await Promise.all(actionsAsync);

        /**
         * Create a new Toolbox object with the retrieved actions.
         * The Toolbox object is created with the actions as its constructor argument.
         */
        return new Toolbox(...actions);
    }
}

