import { Element } from "../main/models";

/**
 * Represents the types a setting value can have.
 * 
 * @typedef {number | string | boolean} SettingType
 */
export type SettingType = number | string | boolean;

/**
 * Defines the allowed data types for settings.
 * 
 * @typedef {"array" | "boolean" | "number" | "string" | "textarea"} SettingAllowedTypes
 */
export type SettingAllowedTypes = "array" | "boolean" | "number" | "string" | "textarea";

/**
 * Defines the allowed input types for settings.
 * 
 * @typedef {"text" | "number" | "checkbox" | "textarea" | "select"} SettingAllowedInputs
 */
export type SettingAllowedInputs = "text" | "number" | "checkbox" | "textarea" | "select";

/**
 * Interface representing a setting binder with methods for getting and setting a value.
 */
export interface SettingBinder {
    /**
     * Retrieves the current value of the setting.
     * 
     * @returns {SettingType} The current value of the setting.
     */
    getValue(): SettingType;

    /**
     * Updates the setting value.
     * 
     * @param {SettingType} value - The new value to set.
     */
    setValue(value: SettingType): void;
}

/**
 * Interface representing a setting in the label designer.
 * 
 * Extends the `Element` interface and adds properties specific to settings, such as label, prop name, and value.
 */
export interface Setting extends Element {
    /**
     * The display label of the setting.
     * 
     * @type {string}
     */
    label: string;

    /**
     * The associated property name for this setting.
     * 
     * @type {string}
     */
    propName: string;

    /**
     * The input type for the setting, defined in `SettingAllowedInputs`.
     * 
     * @type {SettingAllowedInputs}
     */
    type: SettingAllowedInputs;

    /**
     * The current value of the setting.
     * 
     * @type {SettingType}
     */
    value: SettingType;

    /**
     * Optional array of available options for settings that use a dropdown or select input.
     * 
     * @type {SettingType[]}
     */
    select?: SettingType[];

    /**
     * Optional configuration for settings using a textarea.
     * 
     * @type {SettingPropTextarea}
     */
    textarea?: SettingPropTextarea;
}

/**
 * Represents a setting property that is native to a fabric object.
 * 
 * `isNative` is always `true`, and the `value` is optional.
 */
export type SettingNativeProp = {
    /**
     * The value of the setting property.
     * 
     * @type {SettingType}
     */
    value?: SettingType;

    /**
     * Indicates that the property is native to the fabric object.
     * 
     * @type {true}
     */
    isNative: true;
};

/**
 * Represents a setting property that is not native to a fabric object.
 * 
 * `isNative` is always `false`, and the `value` is required.
 */
export type SettingPluginProp = {
    /**
     * The value of the setting property.
     * 
     * @type {SettingType}
     */
    value: SettingType;

    /**
     * Indicates that the property is not native to the fabric object.
     * 
     * @type {false}
     */
    isNative: false;
};

/**
 * Represents configuration options for settings that allow multiple values, such as dropdowns or button groups.
 */
export type SettingPropSelect = {
    /**
     * Available values for the setting.
     * 
     * @type {SettingType[]}
     */
    values: SettingType[];

    /**
     * Specifies the type of UI element to present the options.
     * 
     * @type {"dropdown" | "buttons"}
     */
    type: "dropdown" | "buttons";
};

/**
 * Represents configuration for textarea-specific settings, including size and limits.
 */
export type SettingPropTextarea = {
    /**
     * The number of visible rows in the textarea.
     * 
     * @type {number}
     */
    rows: number;

    /**
     * The number of visible characters per line.
     * 
     * @type {number}
     */
    cols: number;

    /**
     * Whether to enable spellcheck for the textarea.
     * 
     * @type {boolean}
     */
    spellcheck: boolean;

    /**
     * Maximum allowed characters in the textarea.
     * 
     * @type {number}
     */
    maxlength: number;

    /**
     * Minimum required characters in the textarea.
     * 
     * @type {number}
     */
    minlength: number;
};

/**
 * Represents a setting property without options or a textarea.
 */
export type SettingPropExtNone = { 
    /**
     * The `select` field is not present.
     * 
     * @type {undefined}
     */
    select?: undefined; 
    
    /**
     * The `textarea` field is not present.
     * 
     * @type {undefined}
     */
    textarea?: undefined 
};

/**
 * Represents a setting property with options (dropdown or button group) but without a textarea.
 */
export type SettingPropExtSelect = {
    /**
     * Configuration for available options.
     * 
     * @type {SettingPropSelect}
     */
    select: SettingPropSelect;

    /**
     * The `textarea` field is not present.
     * 
     * @type {undefined}
     */
    textarea?: undefined 
};

/**
 * Represents a setting property with a textarea but no options.
 */
export type SettingPropExtTextarea = { 
    /**
     * The `select` field is not present.
     * 
     * @type {undefined}
     */
    select?: undefined; 

    /**
     * Configuration for the textarea.
     * 
     * @type {SettingPropTextarea}
     */
    textarea: SettingPropTextarea 
};

/**
 * Ensures that settings have either options or a textarea, but not both.
 */
export type SettingPropExts = SettingPropExtNone | SettingPropExtSelect | SettingPropExtTextarea;

/**
 * Represents a setting property, which can be either a native or a plugin property,
 * and must have exclusive options for `select` or `textarea`.
 */
export type SettingProp = (SettingNativeProp | SettingPluginProp) & SettingPropExts;
