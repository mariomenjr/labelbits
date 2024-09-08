import { FabricObjectProcessorAsync } from "../fabric";
import { Element } from "../main/models";

/**
 * Represents the type of a setting value. This type is used to represent the value of a setting.
 * It is a union type of number and string.
 */
export type SettingType = number | string;

/**
 * Represents a setting binder, which is an object that has a value property and a setValue method.
 * The value property is used to retrieve the value of the setting, and the setValue method is used to set the value of the setting.
 */
export interface SettingBinder {
    /**
     * Retrieves the value of the setting.
     *
     * @returns The value of the setting.
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
 * A setting is an object that has a label, a property name, a type, and a value.
 */
export interface Setting extends Element {
    /**
     * The label of the setting. This is the text that is displayed for the setting in the settings panel.
     */
    label: string;

    /**
     * The name of the property associated with the setting. This is the name of the property in the fabric object.
     */
    propName: string;

    /**
     * The type of the setting value. This is the type of the value of the setting.
     */
    type: string;

    /**
     * The value of the setting. This is the current value of the setting.
     */
    value: SettingType;
}

/**
 * Represents a function that returns an array of settings.
 * The function takes no arguments and returns an array of settings.
 */
export type SettingCollectionSource = () => Setting[];

/**
 * Represents a setting definition, which is an object that has a name and a boolean flag indicating whether the setting is plugin bound.
 * A setting definition is used to define a setting.
 */
export type SettingDefinition = { name: string, isPluginBound: boolean };

/**
 * Represents a collection of setting definitions.
 * The collection is an array of setting definitions.
 */
export class SettingDefinitionCollection extends Array<SettingDefinition> {

    /**
     * The fabric object processor that is used to process the fabric object when the setting is changed.
     */
    public pluginBinder: FabricObjectProcessorAsync;

    /**
     * Constructs a new SettingDefinitionCollection.
     *
     * @param pluginBinder The fabric object processor that is used to process the fabric object when the setting is changed.
     * @param args The setting definitions.
     */
    constructor(pluginBinder: FabricObjectProcessorAsync, ...args: SettingDefinition[]) {
        super(...args);
        this.pluginBinder = pluginBinder;
    }
}

