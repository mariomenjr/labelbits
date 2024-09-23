import { Collection } from "@labelbits/designer-shared";
import { Setting } from "@labelbits/designer-shared/setting";
import { FabricSelectionEventCallback, IPluginObject, SelectionEvent } from "@labelbits/designer-shared/fabric";

/**
 * Represents a collection of settings for the label designer.
 * The settings are derived from the properties of the selected fabric object.
 *
 * @extends {Collection<Setting>}
 */
export default class Settings extends Collection<Setting> {
    /**
     * Indicates whether there is a selection.
     * 
     * @type {boolean}
     */
    public hasSelection: boolean = false;
    /**
     * A callback function that sets the selection event handler.
     * 
     * The handler is called with the selected fabric object and the settings collection refills
     * itself with the settings derived from the selected object.
     * 
     * @type {FabricSelectionEventCallback}
     * @protected
     */
    protected setSettingsRefiller: FabricSelectionEventCallback;

    /**
     * Initializes the settings collection.
     * 
     * @param {FabricSelectionEventCallback} setSelectionHandler - A callback function that sets the selection event handler.
     * The handler is called with the selected fabric object and the settings collection refills
     * itself with the settings derived from the selected object.
     */
    constructor(setSelectionHandler: FabricSelectionEventCallback) {
        super();
        this.setSettingsRefiller = setSelectionHandler;

        console.debug(`Settings initialized.`);
    }

    /**
     * Starts the settings collection by attaching the selection event handler.
     * 
     * @returns {Settings} The settings collection itself.
     */
    public start(): Settings {
        /**
         * A callback function that is called when a selection event occurs.
         * 
         * @param {SelectionEvent} e - The selection event object.
         */
        this.setSettingsRefiller(e => this.refillSettings(e));
        return this;
    }

    /**
     * Refills the settings collection based on the selected fabric object.
     * 
     * This method is called when a selection event occurs.
     * 
     * @param {SelectionEvent} e - The selection event object that contains information about the event.
     */
    protected refillSettings(e: SelectionEvent): void {
        // Clear the collection
        this.length = 0;

        // Set the selection state based on the number of selected objects
        this.hasSelection = e.selected?.length === 1;

        // If no object is selected, return
        if (!this.hasSelection) return;
        
        // Get and add the settings from the selected object
        const object = e.selected[0] as IPluginObject;

        // Add the settings from the selected object
        this.push(...object.getSettings());
    }
}
