import { Setting } from "@labelbits/designer-shared/setting";
import { SelectionEventCallback, SelectionEvent } from "@labelbits/designer-shared/fabric";

/**
 * Represents a collection of settings for the label designer.
 * The settings are derived from the properties of the selected fabric object.
 *
 * @extends {Collection<Setting>}
 */
export default class Settings extends Array<Setting> {
    /**
     * Starts the settings collection by attaching the selection event handler.
     * 
     * @returns {Settings} The settings collection itself.
     */
    public init(setRefiller: SelectionEventCallback): void {
        /**
         * A callback function that is called when a selection event occurs.
         * 
         * @param {SelectionEvent} e - The selection event object.
         */
        setRefiller(e => this.refill(e));
    }

    /**
     * Refills the settings collection based on the selected fabric object.
     * 
     * This method is called when a selection event occurs.
     * 
     * @param {SelectionEvent} e - The selection event object that contains information about the event.
     */
    protected refill(e: SelectionEvent): void {
        // Clear the collection
        this.length = 0;

        // If there is no selection, return
        if (e.selected?.length !== 1) return;
        
        // Add the settings from the selected object
        this.push(...e.selected[0].getSettings());
    }
}
