import * as fabric from "fabric";

import { Setting, SettingProp } from "../setting/models";

import { FabricSvg, PluginOptions } from "./models";
import { getBoundSettingHandlers } from "../setting";

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

/**
 * Represents a fabric object that implements the IPluginObject interface.
 * The IPluginObject interface is a set of methods and properties that are required
 * to be implemented by fabric objects that are plugins.
 * 
 * @interface IPluginObject
 * @extends {fabric.Object}
 */
export interface IPluginObject extends fabric.Object {
    /**
     * The plugin options of the object.
     * 
     * @type {PluginOptions}
     */
    plugin: PluginOptions;

    /**
     * Updates the object asynchronously.
     * The object is updated by regenerating the SVG string based on the new setting property value.
     * 
     * @async
     * @param {string} propName - The name of the setting property that changed.
     * @param {SettingProp} prop - The new setting property value.
     * @returns {Promise<IPluginObject>} A promise that resolves to the updated object.
     */
    updateObjectAsync(propName: string, prop: SettingProp): Promise<IPluginObject>;

    /**
     * Retrieves the settings of the object.
     * 
     * @returns {Setting[]} An array of setting objects.
     */
    getSettings(): Setting[];
}

export type PluginConstructor<T = fabric.Object> = new (...args: any[]) => T;
export type PluginMixinConstructor<U, T extends PluginConstructor> = new (...args: ConstructorParameters<T>) => U;

/**
 * Creates a mixin class that extends the given fabric object class with the IPluginObject interface.
 * The mixin class adds the `plugin` property and the `updateObjectAsync` and `getSettings` methods to the fabric object.
 * The `plugin` property is an abstract property that must be implemented by the user, and the `updateObjectAsync`
 * and `getSettings` methods are implemented by the mixin class.
 * 
 * @template T - The type of the fabric object class to extend.
 * @param {T} BaseObject - The fabric object class to extend.
 * @returns {PluginMixinConstructor<IPluginObject, T>} A mixin class that extends the given fabric object class
 * with the IPluginObject interface.
 */
export function PluginMixin<T extends PluginConstructor>(BaseObject: T): PluginMixinConstructor<IPluginObject, T> {
    /**
     * A mixin class that extends the given fabric object class with the IPluginObject interface.
     *
     * The mixin class adds the `plugin` property and the `updateObjectAsync` and `getSettings` methods to the fabric object.
     * The `plugin` property is an abstract property that must be implemented by the user, and the `updateObjectAsync`
     * and `getSettings` methods are implemented by the mixin class.
     *
     * @template T The type of the fabric object class to extend.
     * @param {T} BaseObject The fabric object class to extend.
     * @returns {PluginMixinConstructor<IPluginObject, T>} A mixin class that extends the given fabric object class
     * with the IPluginObject interface.
     */
    abstract class PluginObject extends BaseObject implements IPluginObject {
        /**
         * The type of the plugin object.
         * @type {string}
         */
        static type: string = 'PluginObject';

        /**
         * The plugin options of the PluginObject object.
         * This property is abstract and must be implemented by the subclasses.
         * @type {PluginOptions}
         */
        public abstract plugin: PluginOptions;

        /**
         * Updates the object asynchronously when a setting property is changed.
         * The object is updated by regenerating the SVG string based on the new setting property value.
         * @param {string} propName - The name of the setting property that changed.
         * @param {SettingProp} prop - The new setting property value.
         * @returns {Promise<IPluginObject>} A promise that resolves to the updated object.
         */
        public abstract updateObjectAsync(propName: string, prop: SettingProp): Promise<IPluginObject>;

        /**
         * Retrieves the settings of the fabric object.
         * The settings are derived from the properties of the object.
         * @returns {Setting[]} An array of `Setting` objects representing the settings of the fabric object.
         */
        public getSettings(): Setting[] {
            return getBoundSettingHandlers(this);
        }
    }

    return PluginObject as unknown as PluginMixinConstructor<IPluginObject, T>;
}

/**
 * PluginGroup class represents a group of fabric objects that is generated from an SVG string.
 * It extends the fabric.Group class and provides an implementation for the updateObjectAsync method.
 * 
 * @extends {fabric.Group}
 */
export abstract class PluginGroup extends fabric.Group implements IPluginObject {

    /**
     * The type of the plugin object.
     * @type {string}
     */
    static type: string = 'PluginGroup';

    /**
     * Creates a new PluginGroup object from an SVG string.
     * @param {FabricSvg} object - The SVG string to generate the group from.
     */
    constructor(object: FabricSvg) {
        super(object.objects, object.options);
    }

    /**
     * The plugin options of the PluginGroup object.
     * This property is abstract and must be implemented by the subclasses.
     * @type {PluginOptions}
     */
    public abstract plugin: PluginOptions;

    /**
     * Updates the PluginGroup object asynchronously.
     * The object is updated based on the property name and the new value.
     * This method is abstract and must be implemented by the subclasses.
     * @async
     * @param {string} propName - The name of the property that changed.
     * @param {SettingProp} prop - The new setting property value.
     * @returns {Promise<PluginGroup>} A promise that resolves to the updated PluginGroup object.
     */
    public abstract updateObjectAsync(propName: string, prop: SettingProp): Promise<PluginGroup>;

    /**
     * Retrieves the settings of the PluginGroup object.
     * The settings are derived from the properties of the object.
     * 
     * @returns {Setting[]} An array of `Setting` objects representing the settings of the PluginGroup object.
     */
    public getSettings(): Setting[] {
        return getBoundSettingHandlers(this);
    }
}

fabric.classRegistry.setClass(PluginGroup);
