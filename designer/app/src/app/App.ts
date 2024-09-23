import Alpine from "alpinejs";

import LabelDesigner from "./LabelDesigner";

/**
 * Represents the main application class.
 * Provides a static method to initialize and start the Alpine.js application.
 */
export default class App {
    /**
     * Starts the Alpine.js application.
     * Registers the Toolbox and Settings instances as Alpine.js components,
     * and starts the application.
     * 
     * @static
     * @async
     * @returns {Promise<void>} A promise that resolves when the application has started.
     */
    static async start(): Promise<void> {
        // Create an instance of the LabelDesigner asynchronously
        const labelDesigner = await LabelDesigner.createAsync();

        // Retrieve the Toolbox instance asynchronously
        const toolbox = await labelDesigner.getToolboxAsync();

        /**
         * Registers the Toolbox instance as an Alpine.js component.
         * The component is made available to all Alpine.js contexts.
         */
        Alpine.data(`toolbox`, () => toolbox);

        /**
         * Registers the Settings instance as an Alpine.js component.
         * The Settings instance is made available to all Alpine.js contexts.
         * 
         * @returns {Object} The Alpine.js component data object for settings.
         */
        Alpine.data(`settings`, () => {
            return {
                /**
                 * The Settings instance.
                 * 
                 * @type {Settings}
                 */
                data: labelDesigner.getSettings(),

                /**
                 * Initializes the component data.
                 * This function is automatically called by Alpine.js when the component is initialized.
                 * It starts the Settings instance.
                 */
                init(): void {
                    this.data.start();
                },
            };
        });

        // Start the Alpine.js application
        Alpine.start();
    }
}
