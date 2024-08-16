import Alpine from "alpinejs";

import LabelDesigner from "./LabelDesigner";

export default class App {
    /**
     * Starts the Alpine.js application.
     * It registers the Toolbox instance as an Alpine.js component and starts the application.
     */
    static async start(): Promise<void> {

        const labelDesigner = new LabelDesigner();
        labelDesigner.start();

        /**
         * Registers the Toolbox instance as an Alpine.js component.
         * This makes the Toolbox instance available to all components in the application.
         */
        const toolbox = await labelDesigner.getToolboxAsync();
        Alpine.data(`toolbox`, () => toolbox);

        /**
         * Registers the Settings instance as an Alpine.js component.
         * This makes the Settings instance available to all components in the application.
         *
         * @returns {Object} The Alpine.js component data object.
         */
        Alpine.data(`settings`, () => {
            /**
             * Represents the Settings instance as an Alpine.js component data object.
             *
             * @type {Object}
             * @property {Settings} data - The Settings instance.
             */
            return {
                /**
                 * The Settings instance.
                 *
                 * @type {Settings}
                 */
                data: labelDesigner.getSettings(),
                /**
                 * Initializes the component data.
                 *
                 * @returns {void}
                 */
                init(): void {
                    // Register the selection event handler with the Settings instance.
                    this.data.registerSelectionEvents();
                }
            };
        });

        /**
         * Starts the Alpine.js application.
         * This function is called when the application starts.
         */
        Alpine.start();
    }
};

