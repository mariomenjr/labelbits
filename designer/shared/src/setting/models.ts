import { FabricObjectProcessorAsync } from "../fabric";
import { Element } from "../main/models";

/**
 * Represents the type of a setting value.
 * 
 * @typedef {number | string} SettingType
 */
export type SettingType = number | string;

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
 * Represents a function that returns an array of settings.
 * 
 * @returns {Setting[]} An array of setting objects.
 */
export type SettingCollectionSource = () => Setting[];

/**
 * Represents a definition of a setting.
 * 
 * @typedef {Object} SettingDefinition
 * @property {string} name - The name of the setting.
 * @property {boolean} isPluginBound - Indicates whether the setting is bound to a plugin.
 */
export type SettingDefinition = { name: string, isPluginBound: boolean };

/**
 * Represents a collection of setting definitions.
 * 
 * This class extends `Array<SettingDefinition>` and includes a `pluginBinder` property for processing Fabric objects.
 * 
 * @extends {Array<SettingDefinition>}
 */
export class SettingDefinitionCollection extends Array<SettingDefinition> {

    /**
     * The Fabric object processor used to process the Fabric object when the setting is changed.
     * 
     * @type {FabricObjectProcessorAsync}
     */
    public pluginBinder: FabricObjectProcessorAsync;

    /**
     * Constructs a new `SettingDefinitionCollection`.
     * 
     * @param {FabricObjectProcessorAsync} pluginBinder - The Fabric object processor used for processing changes.
     * @param {...SettingDefinition} args - The setting definitions to initialize the collection with.
     */
    constructor(pluginBinder: FabricObjectProcessorAsync, ...args: SettingDefinition[]) {
        super(...args);
        this.pluginBinder = pluginBinder;
    }
}
