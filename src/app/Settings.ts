import * as fabric from "fabric";

import { FabricSelectionEventCallback } from "../utils/handlers";
import { camelToKebabCase, camelToTitleCase } from "../utils/strings";

import Element from "../interfaces/Element";
import Collection from "../interfaces/Collection";

/**
 * Represents the type of a setting value.
 */
type SettingType = number | string;

/**
 * Represents a setting for the label designer.
 */
interface Setting extends Element {
    /**
     * The label of the setting.
     */
    label: string;

    /**
     * The name of the property associated with the setting.
     */
    propName: string;

    /**
     * The value of the setting.
     */
    value: SettingType;

    /**
     * The type of the setting value.
     */
    type: string;
}

/**
 * Creates a new setting object.
 *
 * @param {string} propName - The name of the property associated with the setting.
 * @param {SettingType} value - The value of the setting.
 * @returns {Setting} The created setting object.
 */
function createSetting(propName: string, value: SettingType): Setting {
    return {
        id: `sg-` + camelToKebabCase(propName),
        label: camelToTitleCase(propName),
        propName: propName,
        value: value,
        type: value.constructor.name.toLowerCase(),
    };
}

/**
 * Represents a collection of settings for the label designer.
 * The settings are derived from the properties of the selected fabric object.
 */
/**
 * Represents a collection of settings for the label designer.
 * The settings are derived from the properties of the selected fabric object.
 */
export default class Settings extends Collection<Setting> {
    /**
     * Indicates whether there is a selection.
     */
    hasSelection: boolean = false;

    /**
     * The selected fabric object.
     */
    selectedObject: fabric.Object | null = null;

    /**
     * The callback function for the fabric selection event.
     */
    protected selectionEventCallback: FabricSelectionEventCallback;

    /**
     * Creates a new instance of the Settings class.
     *
     * @param {FabricSelectionEventCallback} selectionEventCallback - The callback function for the fabric selection event.
     */
    constructor(selectionEventCallback: FabricSelectionEventCallback) {
        super();

        this.selectionEventCallback = selectionEventCallback;
        console.debug(`Settings initialized.`);
    }

    /**
     * Registers a callback function for the fabric selection event.
     * When a fabric object is selected, the callback function retrieves the properties of the object and creates settings from them.
     * The created settings are added to the collection.
     */
    public registerSelectionEvents(): void {
        /**
         * A callback function that is called when a selection event occurs.
         *
         * @param {SelectionEvent} e - The selection event object.
         */
        this.selectionEventCallback(e => {

            // Clear the collection
            this.length = 0; 
            
            // Set the selection state based on the number of selected objects
            this.hasSelection = e.selected?.length === 1;
            
            // Reset the selected object
            this.selectedObject = this.hasSelection ? e.selected[0] : null;

            // If there is no selection, return
            if (!this.selectedObject) return;

            // Get the keys of the selected object's properties
            const props = Object.keys(this.selectedObject);

            // Create settings from the properties and add them to the collection
            props.forEach(prop => {
                this.push(createSetting(prop, this.selectedObject?.get(prop) ?? ``));
            });
        });
    }
}
