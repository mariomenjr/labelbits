import Zoom from '../controllers/canvas/Zoom';
import FabricObjectPlugin from '../controllers/plugins/FabricObjectPlugin';

import { getPlugins } from '../plugins';

import Settings from './Settings';
import Toolbox from './Toolbox';

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
     * Starts the label designer application.
     * It registers the plugins.
     */
    start(): void {
        this._registerPlugins();
    }

    /**
     * Retrieves the settings of the label designer.
     * It returns the active objects from the canvas.
     * @returns The settings of the label designer.
     */
    getSettings(): Settings {
        const os = this.canvas.getActiveObjects();
        console.debug(os);
        return new Settings();
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

