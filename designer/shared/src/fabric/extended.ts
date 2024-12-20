import * as fabric from "fabric";
import { v4 as uuidv4 } from "uuid";

import { Setting } from "../setting/models";

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
     * 
     * @async
     * @returns {Promise<IPluginObject>} A promise that resolves to the updated object.
     */
    updateObjectAsync(): Promise<IPluginObject>;

    resyncObjectAsync(): Promise<void>;

    redrawObject(): void;

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
export type PluginMixinConstructor<U, T extends PluginConstructor> = new (...args: ConstructorParameters<T>) => U & InstanceType<T>;

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
         * Updates the object asynchronously.
         * The object is updated by regenerating the SVG string or properties based on the current plugin options.
         * 
         * @async
         * @throws {Error} If not implemented.
         * @returns {Promise<IPluginObject>} A promise that resolves to the updated object.
         */
        public async updateObjectAsync(): Promise<IPluginObject> {
            return new Promise((resolve) => resolve(this));
        }

        /**
         * Refreshes the rendering of the fabric object asynchronously.
         * The object is updated by regenerating the SVG string or properties based on the current plugin options.
         * 
         * @async
         * @returns {Promise<IPluginObject>} A promise that resolves to the updated fabric object.
         */
        public async resyncObjectAsync(): Promise<void> {

            await this.updateObjectAsync();
            this.redrawObject();
        }

        /**
         * Refreshes the rendering of the fabric object.
         * 
         * This method updates the object's coordinates, requests a render of the entire canvas,
         * and fires a 'modified' event to notify listeners of changes to the object.
         */
        public redrawObject(): void {
            
            this.setCoords();
            this.canvas?.requestRenderAll();
            this.fire('modified');
        }

        /**
         * Retrieves the settings of the fabric object.
         * The settings are derived from the properties of the object.
         * @returns {Setting[]} An array of `Setting` objects representing the settings of the fabric object.
         */
        public getSettings(): Setting[] {
            return getBoundSettingHandlers(this);
        }

        /**
         * Converts the object to a JSON representation.
         * The `uid` property is replaced with a new UUID, and the `plugin` and `relationship` properties are included.
         * @param {string[]} [propertiesToInclude] - A list of property names to include in the JSON representation.
         * @returns {Object} - A JSON representation of the object.
         */
        public toObject(propertiesToInclude?: string[]): any {
            return super.toObject([...(propertiesToInclude ?? []), 'uid', 'plugin', 'relationship']);
        }

        /**
         * Clones the fabric object.
         * This method is overridden to include the `plugin` property in the clone.
         * The `plugin` property is not automatically copied by fabric's `clone` method.
         * 
         * @async
         * @returns {Promise<this>} A promise that resolves to a clone of the fabric object.
         */
        public async clone(): Promise<this> {
            const c = await super.clone();

            // For some reason, plugin is not copied correctly.
            // This is a workaround.
            c.plugin = JSON.parse(JSON.stringify(this.plugin));

            return c;
        }
    }

    return PluginObject as unknown as PluginMixinConstructor<IPluginObject, T>;
}

/**
 * PluginSvg class represents a group of fabric objects that is generated from an SVG string.
 * It extends the fabric.Group class and provides an implementation for the updateObjectAsync method.
 * 
 * @extends {fabric.Group}
 */
export abstract class PluginSvg extends PluginMixin(fabric.Group) {
    /**
     * The type of the plugin object.
     * @type {string}
     */
    static type: string = 'PluginSvg';

    /**
     * Constructs a new PluginGroup object from an SVG string.
     * The `lockScalingFlip` option is set to `true` to prevent the object from being flipped when its scale is set to a negative value.
     * The `ml`, `mr`, `mt`, and `mb` controls are hidden.
     * @param {FabricSvg} object - The SVG string from which to construct the fabric objects.
     */
    constructor(object: FabricSvg, pluginOptions: PluginOptions) {
        super(object.objects, { ...object.options, lockScalingFlip: true });
        
        // Hide the ml, mr, mt, and mb controls
        this.setControlsVisibility({
            mb: false,
            ml: false,
            mr: false,
            mt: false
        });

        // Set the plugin options
        this.plugin = pluginOptions;
    }

    /**
     * Updates the textbox object asynchronously.
     * The object is updated by regenerating the SVG string or properties based on the current plugin options.
     *
     * @async
     * @returns {Promise<TextboxObject>} A promise that resolves to the updated textbox object.
     */
    public async updateObjectAsync(): Promise<PluginSvg> {
        return this; // Nothing to do here.
    }
}

fabric.classRegistry.setClass(PluginSvg);
