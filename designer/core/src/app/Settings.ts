import { Setting } from "@labelbits/designer-shared/setting";
import { SelectionEventCallback, SelectionEvent } from "@labelbits/designer-shared/fabric";

import IBridge, { BridgeGetter } from "../bases/IBridge";

/**
 * Represents a collection of settings for the label designer.
 * The settings are derived from the properties of the selected fabric object.
 *
 * @extends {Collection<Setting>}
 */
export default class Settings extends Array<Setting> implements IBridge<SelectionEventCallback> {
    /**
     * Indicates whether the bridge is ready.
     * 
     * @type {boolean}
     */
    public readonly ready: boolean = true; // Per its getter nature, this bridge is always ready.

    /**
     * Bridges the settings collection with the fabric selection event callback.
     * When the selection event callback is called, this method will call the refill method
     * with the selection event object as an argument.
     * 
     * @param {BridgeGetter<SelectionEventCallback>} bridger - The bridge getter function.
     */
    public bridge(bridger: BridgeGetter<SelectionEventCallback>): void {
        bridger.get()(e => this.refill(e));
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
