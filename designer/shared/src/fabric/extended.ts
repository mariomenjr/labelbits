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

export interface IPluginObject extends fabric.Object {
    plugin: PluginOptions;

    updateObjectAsync(propName: string, prop: SettingProp): Promise<IPluginObject>;
    getSettings(): Setting[];
}

export type PluginConstructor<T = fabric.Object> = new (...args: any[]) => T;
export type PluginMixinConstructor<U, T extends PluginConstructor> = new (...args: ConstructorParameters<T>) => U;

export function PluginMixin<T extends PluginConstructor>(BaseObject: T): PluginMixinConstructor<IPluginObject, T> {
    abstract class PluginObject extends BaseObject implements IPluginObject {
        static type = 'PluginObject';

        // Declare the plugin property
        public abstract plugin: PluginOptions;

        // Declare the updateObjectAsync method
        public abstract updateObjectAsync(propName: string, prop: SettingProp): Promise<IPluginObject>;

        /**
         * Retrieves the settings of the fabric object.
         * The settings are derived from the properties of the object.
         * 
         * @returns {Setting[]} An array of `Setting` objects representing the settings of the fabric object.
         */
        public getSettings(): Setting[] {
            return getBoundSettingHandlers(this);
        }
    }

    return PluginObject as unknown as PluginMixinConstructor<IPluginObject, T>;
}

export abstract class PluginGroup extends PluginMixin(fabric.Group) {
    static type = 'PluginGroup';

    constructor(object: FabricSvg) {
        super(object.objects, object.options);
    }
}

fabric.classRegistry.setClass(PluginGroup);
