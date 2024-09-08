import Alpine from "alpinejs";

import LabelDesigner from "./LabelDesigner";

/**
 * Represents the main application class.
 * It provides a static method to start the Alpine.js application.
 */
export default class App {
    /**
     * Starts the Alpine.js application.
     * It registers the Toolbox instance and the Settings instance as Alpine.js components,
     * and starts the application.
     */
    static async start(): Promise<void> {
        const labelDesigner = await LabelDesigner.createAsync();

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
                 * This function is called when the application starts,
                 * and it starts the Settings instance.
                 *
                 * @returns {void}
                 */
                init(): void {
                    this.data.start();
                },
            };
        });

        /**
         * Starts the Alpine.js application.
         * This function is called when the application starts,
         * and it starts the Alpine.js application.
         */
        Alpine.start();
    }
}

