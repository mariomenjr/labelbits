import { Collection } from "@labelbits/designer-shared";
import { Setting } from "@labelbits/designer-shared/setting";
import { FabricSelectionEventCallback, PluginObject, SelectionEvent } from "@labelbits/designer-shared/fabric";

/**
 * Represents a collection of settings for the label designer.
 * The settings are derived from the properties of the selected fabric object.
 */
export default class Settings extends Collection<Setting> {
    /**
     * Indicates whether there is a selection.
     */
    public hasSelection: boolean = false;

    /**
     * The selected fabric object.
     */
    public selectedObject: PluginObject | null = null;

    /**
     * The callback function for the fabric selection event.
     */
    protected setSettingsRefiller: FabricSelectionEventCallback;

    /**
     * Creates a new instance of the Settings class.
     *
     * @param {FabricSelectionEventCallback} setSelectionHandler - The callback function for the fabric selection event.
     */
    constructor(setSelectionHandler: FabricSelectionEventCallback) {
        super();

        this.setSettingsRefiller = setSelectionHandler;
        console.log(`Settings initialized.`);
    }

    /**
     * Registers a callback function for the fabric selection event.
     * When a fabric object is selected, the callback function retrieves the properties of the object and creates settings from them.
     * The created settings are added to the collection.
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
     * Refills the collection with settings from the selected fabric object.
     *
     * @param {SelectionEvent} e - The selection event object.
     */
    protected refillSettings(e: SelectionEvent): void {
        // Clear the collection
        this.length = 0;

        // Set the selection state based on the number of selected objects
        this.hasSelection = e.selected?.length === 1;

        // Reset the selected object
        this.selectedObject = this.hasSelection ? e.selected[0] as PluginObject : null;

        // If there is no selection, return
        if (!this.selectedObject) return;

        // Get the properties of the selected object
        this.push(...this.selectedObject.getSettings());
    }
}

