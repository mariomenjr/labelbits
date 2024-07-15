import Alpine from "alpinejs";
import LabelDesigner from '../core/index';
import Toolbox from "../models/Toolbox";

/**
 * Creates a new instance of the LabelDesigner class.
 *
 * @type {LabelDesigner}
 */
const ld = new LabelDesigner();

/**
 * Creates a new instance of the Toolbox class, passing the LabelDesigner instance as an argument.
 *
 * @type {Toolbox}
 */
const tb = new Toolbox(ld);

/**
 * The main application object.
 * It starts the Alpine.js application and provides methods to interact with it.
 *
 * @type {Object}
 */
export default {
    /**
     * Starts the Alpine.js application.
     * It registers the Toolbox instance as an Alpine.js component and starts the application.
     */
    start() {
        /**
         * Registers the Toolbox instance as an Alpine.js component.
         * This makes the Toolbox instance available to all components in the application.
         */
        Alpine.data(`toolbox`, () => tb);

        /**
         * Starts the Alpine.js application.
         * This function is called when the application starts.
         */
        Alpine.start();
    },
};
