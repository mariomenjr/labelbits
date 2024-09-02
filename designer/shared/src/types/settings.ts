import Element from "../interfaces/Element";

export type SettingsSource = () => Setting[];

/**
 * Represents the type of a setting value.
 */
export type SettingType = number | string;

/**
 * Represents a setting binder, which is an object that has a value property and a setValue method.
 */
export interface SettingBinder {
    /**
     * The value of the setting.
     */
    getValue(): SettingType;

    /**
     * Sets the value of the setting.
     *
     * @param value The new value of the setting.
     */
    setValue(value: SettingType): void;
}

/**
 * Represents a setting for the label designer.
 */
export interface Setting extends Element {
    /**
     * The label of the setting.
     */
    label: string;

    /**
     * The name of the property associated with the setting.
     */
    propName: string;

    /**
     * The type of the setting value.
     */
    type: string;

    /**
     * The value of the setting.
     */
    value: SettingType;
}
