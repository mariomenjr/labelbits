import { FabricObjectProcessorAsync } from "../fabric";
import { Element } from "../main/models";

/**
 * Represents the type of a setting value.
 */
export type SettingType = number | string;

/**
 * Represents a setting binder, which is an object that has a value property and a setValue method.
 */
export interface SettingBinder {
    /**
     * Retrieves the value of the setting.
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

/**
 * Represents a function that returns an array of settings.
 */
export type SettingCollectionSource = () => Setting[];

/**
 * Represents a setting definition.
 */
export type SettingDefinition = { name: string, isPluginBound: boolean };

/**
 * Represents a collection of setting definitions.
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

