import * as fabric from "fabric";
import { v4 as uuidv4 } from "uuid";

import { Setting, SettingProp } from "../setting/models";

import { FabricSvg, PluginOptions } from "./models";
import { getBoundSettingHandlers } from "../setting";

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
     * @type {IPluginObject[]}
     */
    selected: IPluginObject[],

    /**
     * The array of deselected fabric objects.
     * 
     * @type {IPluginObject[]}
     */
    deselected: IPluginObject[]
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
     * The unique identifier of the object.
     * 
     * @type {string}
     * @readonly
    */
    readonly uid: string;
    /**
     * The plugin options of the object.
     * 
     * @type {PluginOptions}
     */
    plugin: PluginOptions;

    /**
     * The relationship transform matrix of the object.
     * This matrix describes the relationship of the object to the label area.
     * 
     * @type {fabric.TMat2D}
     */
    relationship?: fabric.TMat2D;

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

/** 
 * The constructor of the fabric object that is extended with the IPluginObject interface.
 * 
 * @template T - The type of the fabric object class to extend.
 * @param {T} BaseObject - The fabric object class to extend.
 * @returns {PluginConstructor<T>} The constructor of the fabric object that is extended with the IPluginObject interface.
*/
export type PluginConstructor<T = fabric.Object> = new (...args: any[]) => T;
/**
 * The constructor of the mixin class that extends the given fabric object class with the IPluginObject interface.
 * 
 * @template T - The type of the fabric object class to extend.
 * @template U - The type of the mixin class that extends the given fabric object class with the IPluginObject interface.
 * @param {U} BaseObject - The fabric object class to extend.
 * @returns {PluginMixinConstructor<U, T>} The constructor of the mixin class that extends the given fabric object class
 * with the IPluginObject interface.
 */
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
         * The unique identifier of the fabric object.
         * @type {string}
         * @readonly
         * @default uuidv4()
         */
        public readonly uid:string = uuidv4();

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
export abstract class PluginGroup extends fabric.Group implements IPluginObject { // TODO: How to extend it from PluginMixin?

    /**
     * The type of the plugin object.
     * @type {string}
     */
    static type: string = 'PluginGroup';

    /**
     * The unique identifier of the fabric object.
     * @type {string}
     * @readonly
     * @default uuidv4()
     */
    public readonly uid:string = uuidv4();

    /**
     * Constructs a new PluginGroup object from an SVG string.
     * The `lockScalingFlip` option is set to `true` to prevent the object from being flipped when its scale is set to a negative value.
     * The `ml`, `mr`, `mt`, and `mb` controls are hidden.
     * @param {FabricSvg} object - The SVG string from which to construct the fabric objects.
     */
    constructor(object: FabricSvg) {
        super(object.objects, { ...object.options, lockScalingFlip: true });

        // Hide the ml, mr, mt, and mb controls
        this.setControlsVisibility({
            mb: false,
            ml: false,
            mr: false,
            mt: false
        });
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
