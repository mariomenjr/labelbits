import { FabricSelectionEventCallback, SelectionEvent } from "../utils/handlers";
import { camelToKebabCase, camelToTitleCase } from "../utils/strings";

import Element from "../interfaces/Element";
import Collection from "../interfaces/Collection";
import { PluginObject } from "../utils/fabric";

/**
 * Represents the type of a setting value.
 */
export type SettingType = number | string;

/**
 * Represents a setting binder, which is an object that has a value property and a setValue method.
 */
export interface SettingBinder {
    /**
     * The value of the setting.
     */
    getValue(): SettingType;

    /**
     * Sets the value of the setting.
     *
     * @param value The new value of the setting.
     */
    setValue(value: SettingType): void;
}

/**
 * Represents a setting for the label designer.
 */
export interface Setting extends Element {
    /**
     * The label of the setting.
     */
    label: string;

    /**
     * The name of the property associated with the setting.
     */
    propName: string;

    /**
     * The type of the setting value.
     */
    type: string;

    /**
     * The value of the setting.
     */
    value: SettingType;
}

/**
 * Creates a new setting object from a property name and a setting binder.
 *
 * @param propName The name of the property associated with the setting.
 * @param settingBinder The setting binder.
 *
 * @returns The new setting object.
 */
export function createSetting(propName: string, settingBinder: SettingBinder): Setting {
    console.debug({propName, settingBinder});
    return {
        propName,

        label: camelToTitleCase(propName),
        id: `sg-${camelToKebabCase(propName)}`,
        type: settingBinder.getValue().constructor.name.toLowerCase(),

        get value() {
            return settingBinder.getValue();
        },

        set value(v) {
            settingBinder.setValue(v);
        }
    };
}

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

