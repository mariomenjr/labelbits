import { Collection } from "@labelbits/designer-shared";
import { Setting } from "@labelbits/designer-shared/setting";
import { FabricSelectionEventCallback, PluginObject, SelectionEvent } from "@labelbits/designer-shared/fabric";

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
     * The currently selected fabric object.
     * 
     * @type {PluginObject | null}
     */
    public selectedObject: PluginObject | null = null;

    /**
     * The callback function for handling fabric selection events.
     * This function will be called when a selection event occurs.
     * 
     * @type {FabricSelectionEventCallback}
     */
    protected setSettingsRefiller: FabricSelectionEventCallback;

    /**
     * Creates a new instance of the Settings class.
     * 
     * @param {FabricSelectionEventCallback} setSelectionHandler - The callback function for handling fabric selection events.
     */
    constructor(setSelectionHandler: FabricSelectionEventCallback) {
        super();
        this.setSettingsRefiller = setSelectionHandler;
        console.log(`Settings initialized.`);
    }

    /**
     * Registers a callback function for fabric selection events.
     * This method starts listening for selection events and refills the settings collection based on the selected object.
     */
    public start(): void {
        /**
         * A callback function that is called when a selection event occurs.
         * 
         * @param {SelectionEvent} e - The selection event object.
         */
        this.setSettingsRefiller(e => this.refillSettings(e));
    }

    /**
     * Refills the settings collection with settings from the selected fabric object.
     * 
     * @param {SelectionEvent} e - The selection event object.
     */
    protected refillSettings(e: SelectionEvent): void {
        // Clear the collection
        this.length = 0;

        // Set the selection state based on the number of selected objects
        this.hasSelection = e.selected?.length === 1;

        // Set the selected object based on the selection state
        this.selectedObject = this.hasSelection ? e.selected[0] as PluginObject : null;

        // If no object is selected, return
        if (!this.selectedObject) return;

        // Get and add the settings from the selected object
        this.push(...this.selectedObject.getSettings());
    }
}
