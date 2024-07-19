import Alpine from "alpinejs";
import LabelDesigner from '../core/LabelDesigner';
import Toolbox from "../ui/Toolbox";
import Settings from "../ui/Settings";

// Instantiate LabelDesigner
const ld: LabelDesigner = new LabelDesigner(); 

// Create a new Toolbox instance associated with the LabelDesigner
const tb: Toolbox = new Toolbox(ld);

// Create a new Settings instance associated with the LabelDesigner
const sg: Settings = new Settings(ld);

/**
 * The main application object.
 * It starts the Alpine.js application and provides methods to interact with it.
 *
 * @type {Object}
 */
export default class App {
    /**
     * Starts the Alpine.js application.
     * It registers the Toolbox instance as an Alpine.js component and starts the application.
     */
    static start(): void {
        /**
         * Registers the Toolbox instance as an Alpine.js component.
         * This makes the Toolbox instance available to all components in the application.
         */
        Alpine.data(`toolbox`, () => tb);

        /**
         * Registers the Settings instance as an Alpine.js component.
         * This makes the Settings instance available to all components in the application.
         */
        Alpine.data(`settings`, () => sg);

        /**
         * Starts the Alpine.js application.
         * This function is called when the application starts.
         */
        Alpine.start();
    }
};

