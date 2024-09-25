import { Element } from "../main/models";

/**
 * Represents the type of a setting value.
 * 
 * @typedef {number | string | boolean} SettingType
 */
export type SettingType = number | string | boolean;

/**
 * Represents a setting binder, which is an object that has methods to get and set the value of a setting.
 */
export interface SettingBinder {
    /**
     * Retrieves the current value of the setting.
     * 
     * @returns {SettingType} The value of the setting.
     */
    getValue(): SettingType;

    /**
     * Sets a new value for the setting.
     * 
     * @param {SettingType} value - The new value to set for the setting.
     */
    setValue(value: SettingType): void;
}

/**
 * Represents a setting for the label designer.
 * 
 * This interface extends the `Element` interface and adds properties related to settings, such as label, property name, and value type.
 */
export interface Setting extends Element {
    /**
     * The label of the setting, which is displayed to the user.
     * 
     * @type {string}
     */
    label: string;

    /**
     * The name of the property associated with the setting.
     * 
     * @type {string}
     */
    propName: string;

    /**
     * The type of the setting value. This is typically a string indicating the type.
     * 
     * @type {string}
     */
    type: string;

    /**
     * The current value of the setting.
     * 
     * @type {SettingType}
     */
    value: SettingType;
}

/**
 * A property that is native to the fabric object.
 * 
 * The value property is optional, and if it is not provided, the setting value will be set to undefined.
 * The isNative property is set to true.
 */
export type SettingNativeProp = {
    /**
     * The value of the setting property.
     * 
     * @type {SettingType}
     */
    value?: SettingType;
    /**
     * Whether the property is native to the fabric object.
     * 
     * @type {true}
     */
    isNative: true;
}

/**
 * A property that is not native to the fabric object.
 * 
 * The value property is required, and the isNative property is set to false.
 */
export type SettingPluginProp = {
    /**
     * The value of the setting property.
     * 
     * @type {SettingType}
     */
    value: SettingType;
    /**
     * Whether the property is native to the fabric object.
     * 
     * @type {false}
     */
    isNative: false;
}

/**
 * A setting property.
 * 
 * This type can be either a native property or a plugin property.
 */
export type SettingProp = SettingNativeProp | SettingPluginProp;
