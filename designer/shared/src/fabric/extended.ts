import * as fabric from "fabric";

import { SettingsSource } from "../setting/models";

/**
 * Represents a fabric object that can be used in the label designer.
 * This type extends the fabric.Object type and adds the `getSettings` property,
 * which is used to retrieve settings from the object.
 */
export type PluginObject = fabric.Object & {
    /**
     * A function that returns an array of settings for the object.
     * This function is used to retrieve settings from the object.
     */
    getSettings: SettingsSource;
};

/**
 * Represents a fabric object that can have a relationship transform matrix.
 * 
 * This type extends the fabric.Object type and adds the `relationship` property.
 * The `relationship` property is a transform matrix that describes the relationship of the object
 * to the label area.
 */
export type TransformingObject = fabric.Object & {
    /**
     * The relationship transform matrix of the object.
     * This matrix describes the relationship of the object to the label area.
     */
    relationship: fabric.TMat2D;
};

/**
 * Represents an event object that contains information about the selection event.
 * It is a partial representation of the fabric.TEvent<fabric.TPointerEvent> interface and
 * includes the selected and deselected objects.
 */
export type SelectionEvent = Partial<fabric.TEvent<fabric.TPointerEvent>> & {
    /**
     * The array of selected fabric objects.
     */
    selected: fabric.Object[],
    /**
     * The array of deselected fabric objects.
     */
    deselected: fabric.Object[]
};
