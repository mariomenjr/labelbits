import * as fabric from "fabric";
import { SettingCollectionSource } from "../setting/models";

/**
 * Represents a fabric object that can be used in the label designer.
 * This type extends the fabric.Object type and adds additional properties
 * for use in the plugin system.
 * 
 * @typedef {Object} PluginObject
 * @extends {fabric.Object}
 */
export type PluginObject = fabric.Object & {
    /**
     * A function that returns an array of settings for the object.
     * This function is used to retrieve settings from the object.
     * 
     * @type {SettingCollectionSource}
     */
    getSettings: SettingCollectionSource;

    /**
     * The text content of the object.
     * 
     * @type {string}
     */
    text: string;
};

/**
 * Represents a fabric object that can have a relationship transform matrix.
 * This type extends the fabric.Object type and adds the `relationship` property.
 * 
 * @typedef {Object} TransformingObject
 * @extends {fabric.Object}
 */
export type TransformingObject = fabric.Object & {
    /**
     * The relationship transform matrix of the object.
     * This matrix describes the relationship of the object to the label area.
     * 
     * @type {fabric.TMat2D}
     */
    relationship: fabric.TMat2D;
};

/**
 * Represents an event object that contains information about the selection event.
 * It is a partial representation of the fabric.TEvent<fabric.TPointerEvent> interface and
 * includes the selected and deselected objects.
 * 
 * @typedef {Object} SelectionEvent
 * @extends {Partial<fabric.TEvent<fabric.TPointerEvent>>}
 */
export type SelectionEvent = Partial<fabric.TEvent<fabric.TPointerEvent>> & {
    /**
     * The array of selected fabric objects.
     * 
     * @type {fabric.Object[]}
     */
    selected: fabric.Object[],

    /**
     * The array of deselected fabric objects.
     * 
     * @type {fabric.Object[]}
     */
    deselected: fabric.Object[]
};