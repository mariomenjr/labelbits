import Alpine from "alpinejs";
import * as fabric from "fabric";

import LabelDesigner from "@labelbits/designer-core";
import { IPluginObject, PluginObjectAction, Position } from "@labelbits/designer-shared/fabric";

import config from "../../labelbits.config";

/**
 * The main application class.
 * This class is responsible for starting the application, and registering the components that are used in the application.
 * 
 * @see https://alpinejs.dev
 * @class
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
        const labelDesigner = await LabelDesigner.createAsync(config);

        /**
         * Registers the Toolbox instance as an Alpine.js component.
         * The component is made available to all Alpine.js contexts.
         */
        Alpine.data(`toolbox`, () => ({ data: labelDesigner.toolbox }));

        /**
         * Registers the Slider instance as an Alpine.js component.
         * The component is made available to all Alpine.js contexts.
         */
        Alpine.data(`slider`, () => ({
            /**
             * The Slider instance.
             * 
             * @type {Slider}
             */
            data: labelDesigner.slider,

            /**
             * Initializes the slider component.
             * 
             * It sets up a bridge to handle the `input` event of the HTML input element.
             * The bridge is used to keep the HTML input element in sync with the zoom level of the LabelDesigner.
             * When the user changes the value of the HTML input element, the bridge sets the zoom level of the LabelDesigner.
             * When the zoom level of the LabelDesigner changes, the bridge updates the value of the HTML input element.
             */
            init(): void {
                this.data.bridge({
                    get: () => labelDesigner.getZoom(),
                    set: (v: number) => labelDesigner.zoomToCenter(v),
                    /**
                     * Sets the value of the HTML input element when the zoom level of the LabelDesigner changes.
                     * 
                     * @param {number} v - The new zoom level of the LabelDesigner.
                     */
                    on: (v: number) => {
                        const ref = this.$refs.slider as HTMLInputElement;
                        ref.value = v.toString();
                    }
                });
            }
        }));

        /**
         * Registers the Settings instance as an Alpine.js component.
         * The Settings instance is made available to all Alpine.js contexts.
         */
        Alpine.data(`settings`, () => ({
            /**
             * The Settings instance.
             * 
             * @type {Settings}
             */
            data: labelDesigner.settings,

            /**
             * Initializes the settings component.
             * It sets up the bridge to get the selection handler from the label designer.
             * 
             * Note: We need to call init() on the Settings instance that's already been
             * wrapped by Alpine's reactivity system. Otherwise, reactivity doesn't work.
             */
            init(): void {
                this.data.bridge({
                    get: () => labelDesigner.selectionHandler
                });
            },
        }));

        /**
         * Registers the ContextMenu instance as an Alpine.js component.
         * The ContextMenu instance is made available to all Alpine.js contexts.
         */
        Alpine.data('contextmenu', () => {
            return {
                /**
                 * The x-coordinate of the context menu.
                 * 
                 * @type {number}
                 */
                left: 0,
                /**
                 * The y-coordinate of the context menu.
                 * 
                 * @type {number}
                 */
                top: 0,

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
                            label: `Clone`,
                            icon: `copy`,
                            /**
                             * Clones the selected object and adds the clone to the canvas.
                             * The clone is then resynchronized and the context menu is hidden.
                             */
                            onClick: (): void => this.perform((o) => o.clone()
                                                                      .then(c => { o.canvas?.add(c); return c; })
                                                                      .then(c => c.resyncObjectAsync()))
                        },
                        {
                            label: `Delete`,
                            icon: `delete`,
                            onClick: () => this.perform((o) => o.canvas?.remove(o))
                        },
                        {
                            label: `Send to back`,
                            icon: `send-backwards`,
                            onClick: () => this.perform((o) => o.canvas?.sendObjectToBack(o))
                        },
                        {
                            label: `Bring forward`,
                            icon: `bring-forward`,
                            onClick: () => this.perform((o) => o.canvas?.bringObjectToFront(o))
                        },
                    ];
                },
                /**
                 * Applies the specified action to the selected object.
                 * If the selected object is `undefined`, the action is applied to all active objects.
                 * After applying the action, the active object is discarded and the canvas is rendered.
                 * The context menu is then hidden.
                 * 
                 * @param {PluginObjectAction} action - The action to apply to the selected object(s).
                 */
                perform(action: PluginObjectAction): void {
                    if (!this.uid) return;

                    const target = labelDesigner.getObjects().find((o) => (o as IPluginObject).uid === this.uid) as IPluginObject;

                    if (target) {
                        action(target);
                    } else {
                        labelDesigner.getActiveObjects().forEach((o) => action(o as IPluginObject));
                    }

                    labelDesigner.discardActiveObject();
                    labelDesigner.requestRenderAll();

                    this.hide();
                },
                /**
                 * Initializes the context menu event handler.
                 * It listens for the `mouse:down` event on the label designer.
                 * When the event is triggered, it checks if the right mouse button is clicked (button 2).
                 * If yes, it shows the context menu at the position of the event with the currently selected object.
                 * If no, it hides the context menu.
                 * @returns {void}
                 */
                init(): void {
                    labelDesigner.on('mouse:down', (event) => {
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
                 * @param {fabric.TPointerEventInfo} event - The event that triggered the context menu.
                 * @param {IPluginObject} target - The target object that was right-clicked or the active object if no object was right-clicked.
                 * @returns {void}
                 */
                show(event: fabric.TPointerEventInfo, target: IPluginObject): void {
                    this.left = event.pointer.x;
                    this.top = event.pointer.y;

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

        /**
         * Applies the `position` directive to the Alpine.js application.
         * It sets the top and left CSS properties of the element to the position object's top and left properties.
         */
        Alpine.directive("position", (el, { expression }, { evaluate }) => {
            const v = evaluate<Position>(expression);

            el.style.top = `${v.top}px`;
            el.style.left = `${v.left}px`;
        });

        // Start the Alpine.js application
        Alpine.start();
    }
}

