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
    plugin: PluginOptions
    updateObjectAsync(propName: string, prop: SettingProp): Promise<IPluginObject>;
    getSettings(): Setting[]
}

export abstract class PluginTextbox extends fabric.Textbox implements IPluginObject {

    static type = 'PluginObject';

    constructor(object: fabric.Textbox) {
        super(object.text, object);
    }

    public abstract plugin: PluginOptions;
    public abstract updateObjectAsync(propName: string, prop: SettingProp): Promise<PluginTextbox>;

    public getSettings = (): Setting[] => getBoundSettingHandlers(this);
};

fabric.classRegistry.setClass(PluginTextbox);

export abstract class PluginGroup extends fabric.Group implements IPluginObject {

    static type = 'PluginGroup';

    constructor(object: FabricSvg) {
        super(object.objects, object.options);
    }

    public abstract plugin: PluginOptions;
    public abstract updateObjectAsync(propName: string, prop: SettingProp): Promise<PluginGroup>;

    public getSettings = (): Setting[] => getBoundSettingHandlers(this);
}

fabric.classRegistry.setClass(PluginGroup);
