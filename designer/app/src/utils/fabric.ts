import * as fabric from "fabric";
import { SettingsSource } from "../app/Settings";

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

