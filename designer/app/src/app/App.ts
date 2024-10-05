import Alpine from "alpinejs";
import * as fabric from "fabric";

import { IPluginObject } from "@labelbits/designer-shared/fabric";

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

        /**
         * Registers the ContextMenu instance as an Alpine.js component.
         * The ContextMenu instance is made available to all Alpine.js contexts.
         * 
         * @returns {Object} The Alpine.js component data object for the context menu.
         */
        Alpine.data('contextmenu', () => {
            return {
                /**
                 * The x-coordinate of the context menu.
                 * 
                 * @type {number}
                 */
                x: 0,

                /**
                 * The y-coordinate of the context menu.
                 * 
                 * @type {number}
                 */
                y: 0,

                /**
                 * The uid of the target object that was right-clicked or the active object if no object was right-clicked.
                 * 
                 * @type {string}
                 */
                uid: ``,

                /**
                 * Indicates whether the context menu is currently shown.
                 * 
                 * @type {boolean}
                 */
                toggled: false,

                /**
                 * Returns an array of options for the context menu.
                 * Each option is an object with the following properties:
                 * - `label`: The text to display in the context menu for the option.
                 * - `icon`: The icon to display in the context menu for the option.
                 * - `onClick`: A function that is called when the option is clicked.
                 * The function is called with the selected object as its argument.
                 */
                get options() {
                    return [
                        {
                            label: `Delete`,
                            icon: `delete`,
                            onClick: () => this.perform((o) => o.canvas?.remove(o))
                        },
                        {
                            label: `Send to back`,
                            icon: `send-backwards`,
                            /**
                             * Moves the object to the back of the canvas's object stack.
                             * This affects the z-index of the object, with lower-indexed objects appearing below higher-indexed objects.
                             * Also moves the object's clip path to the back of the stack.
                             * @param {fabric.Object} o - The selected fabric object.
                             */
                            onClick: () => this.perform((o) => {
                                o.canvas?.sendObjectToBack(o);
                                o.canvas?.sendObjectToBack(o.clipPath as fabric.Object);
                            })
                        },
                        {
                            label: `Bring forward`,
                            icon: `bring-forward`,
                            onClick: () => this.perform((o) => o.canvas?.bringObjectToFront(o))
                        },
                    ];
                },
                /**
                 * Applies the given action to the object that was right-clicked
                 * or to all active objects if no object was right-clicked.
                 * After applying the action, it hides the context menu and refreshes the canvas.
                 * 
                 * @param {function(target: IPluginObject | fabric.Group): void} action
                 * The function that will be called with the target object as its argument.
                 * @returns {void}
                 */
                perform(action: (target: IPluginObject | fabric.Group) => void): void {
                    if (!this.uid) return;

                    const canvas = labelDesigner.canvas;
                    const target = canvas.getObjects().find((o) => (o as IPluginObject).uid === this.uid) as IPluginObject;

                    if (target) {
                        action(target);
                    } else {
                        canvas.getActiveObjects().forEach((o) => action(o as IPluginObject));
                        canvas.discardActiveObject();
                    }

                    canvas.requestRenderAll();
                    this.hide();
                },
                /**
                 * Initializes the context menu event listener.
                 * When the user right-clicks on the canvas, it shows the context menu.
                 * When the user left-clicks on the canvas, it hides the context menu.
                 * 
                 * @returns {void}
                 */
                init(): void {
                    labelDesigner.canvas.on('mouse:down', (event) => {
                        if (!event.target) return;

                        const o = event.target as IPluginObject;
                        if (o instanceof fabric.Rect) return;

                        const e = event.e as MouseEvent;
                        if (e.button === 2) {
                            this.show(event, o);
                        } else {
                            this.hide();
                        }
                    });
                },
                /**
                 * Shows the context menu and sets its position to the given event pointer.
                 * It also sets the context menu's target object to the given target object.
                 * If the target object has no uid, it sets the context menu's uid to a string
                 * that represents the number of selected objects.
                 * Otherwise, it sets the context menu's uid to the target object's uid.
                 * 
                 * @param {fabric.TPointerEventInfo<fabric.TPointerEvent>} event - The event that triggered the context menu.
                 * @param {IPluginObject} target - The target object that was right-clicked or the active object if no object was right-clicked.
                 * @returns {void}
                 */
                show(event: fabric.TPointerEventInfo<fabric.TPointerEvent>, target: IPluginObject): void {
                    this.x = event.pointer.x;
                    this.y = event.pointer.y;

                    this.toggled = true;

                    if (!target.uid) {
                        this.uid = `selected:` + target.canvas!.getActiveObjects().length;
                    } else {

                        target.canvas!.setActiveObject(target);
                        this.uid = target.uid;
                    }
                },
                /**
                 * Hides the context menu and resets its uid to an empty string.
                 * This should be called when the context menu should be hidden.
                 * 
                 * @returns {void}
                 */
                hide(): void {
                    this.uid = ``;
                    this.toggled = false;
                },
            };
        });

        // Start the Alpine.js application
        Alpine.start();
    }
}

