import Zoom from '../controllers/canvas/Zoom';
import FabricObjectPlugin from '../controllers/plugins/FabricObjectPlugin';

import { getPlugins } from '../plugins';

import Settings from './Settings';
import Toolbox from './Toolbox';

import { FabricSelectionEventHandler } from '../utils/handlers';

/**
 * The LabelDesigner class represents the main label designer application.
 * It provides methods to register plugins, start the application, get settings, and get the toolbox.
 */
export default class LabelDesigner extends Zoom {

    /**
     * The list of plugins registered in the label designer.
     */
    protected plugins: FabricObjectPlugin[] = [];

    /**
     * Registers the plugins in the label designer.
     */
    protected _registerPlugins() {
        this.plugins.push(...getPlugins());
    }

    /**
     * Registers the given FabricSelectionEventHandler to be called whenever a selection event occurs on the canvas.
     * This method listens for the "selection:created", "selection:updated", and "selection:cleared" events.
     *
     * @param {FabricSelectionEventHandler} selectionHandler - The handler function to be called for selection events.
     * @return {void} This function does not return anything.
     */
    public registerSelectionEvents(selectionHandler: FabricSelectionEventHandler): void {
        
        this.canvas.on("selection:created", selectionHandler);
        this.canvas.on("selection:updated", selectionHandler);
        this.canvas.on("selection:cleared", selectionHandler);
    }

    /**
     * Starts the label designer application.
     * It registers the plugins.
     */
    start(): void {
        this._registerPlugins();
    }

    /**
     * Retrieves the settings of the label designer.
     * It returns an instance of the Settings class, which encapsulates the active objects from the canvas.
     *
     * @returns {Settings} The settings of the label designer.
     */
    getSettings(): Settings {
        // Binds the 'registerSelectionEvents' method of the current instance of the LabelDesigner class
        // to the 'selectionEventCallback' parameter of the Settings constructor.
        // This ensures that the 'registerSelectionEvents' method is called with the correct 'this' context.
        return new Settings(this.registerSelectionEvents.bind(this));
    }

    /**
     * Retrieves the toolbox of the label designer.
     * It returns a promise that resolves to a Toolbox object.
     * @returns A promise that resolves to a Toolbox object.
     */
    async getToolboxAsync(): Promise<Toolbox> {

        // Get the actions from the plugins
        const actionsAsync = this.plugins.map((p) => p.getActionAsync((o) => this.addObject(o)));

        // Wait for all the actions to be retrieved
        const actions = await Promise.all(actionsAsync);

        // Create a new Toolbox object with the retrieved actions
        return new Toolbox(...actions);
    }
}

