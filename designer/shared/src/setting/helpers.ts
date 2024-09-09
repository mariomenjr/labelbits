import { FabricObjectProcessorAsync, PluginObject } from "../fabric";
import { camelToKebabCase, camelToTitleCase } from "../main/strings";
import { Setting, SettingBinder, SettingType, SettingCollectionSource, SettingDefinitionCollection } from "./models";

/**
 * Creates a new setting object that represents a property of a Fabric object.
 *
 * @param {string} propName - The name of the property associated with the setting.
 * @param {SettingBinder} settingBinder - The setting binder that manages the property's value.
 * 
 * @returns {Setting} The new setting object, including methods to get and set the property's value.
 */
export function createSettingElement(propName: string, settingBinder: SettingBinder): Setting {
    return {
        propName,

        label: camelToTitleCase(propName),
        id: `sg-${camelToKebabCase(propName)}`,
        type: settingBinder.getValue().constructor.name.toLowerCase(),

        get value() {
            return settingBinder.getValue();
        },

        set value(v) {
            settingBinder.setValue(v);
        }
    };
}

/**
 * Binds a property of the Fabric object to a setting using a default binder.
 * 
 * @param {PluginObject} object - The Fabric object to bind the property from.
 * @param {string} propName - The name of the property to bind.
 * 
 * @returns {SettingBinder} A setting binder object for the property.
 */
export function getDefaultBinder(object: PluginObject, propName: string): SettingBinder {
    return {
        /**
         * Retrieves the value of the property.
         * 
         * @returns {SettingType} The current value of the property.
         */
        getValue(): SettingType {
            return object.get(propName);
        },

        /**
         * Sets the value of the property.
         * 
         * @param {SettingType} v - The new value to set for the property.
         */
        setValue(v: SettingType) {
            object.set(propName, v);

            object.setCoords();
            object.canvas?.requestRenderAll();
            object.fire('modified');
        }
    };
}

/**
 * Binds a property of the Fabric object to a setting using a plugin-specific binder.
 * 
 * @param {PluginObject} object - The Fabric object to bind the property from.
 * @param {string} propName - The name of the property to bind.
 * @param {FabricObjectProcessorAsync} bindingProcessorAsync - An asynchronous processor for the Fabric object.
 * 
 * @returns {SettingBinder} A setting binder object that includes asynchronous processing.
 */
export function getPluginBinder(object: PluginObject, propName: string, bindingProcessorAsync: FabricObjectProcessorAsync): SettingBinder {
    const binder = getDefaultBinder(object, propName);

    return {
        ...binder,
        async setValue(v: SettingType) {
            object.set(propName, v);

            const { left, top, scaleX, scaleY, angle, flipX, flipY } = object;

            const updatedObject = await bindingProcessorAsync(object, propName);

            updatedObject.set({ left, top, scaleX, scaleY, angle, flipX, flipY });

            updatedObject.setCoords();
            updatedObject.canvas?.requestRenderAll();
            updatedObject.fire('modified');
        }
    };
}

/**
 * Retrieves the settings source for the Fabric object, based on the provided property settings.
 * 
 * @param {SettingDefinitionCollection} propSettings - The collection of setting definitions to use.
 * @param {PluginObject} object - The Fabric object for which settings are being retrieved.
 * 
 * @returns {SettingCollectionSource} A function that returns an array of setting objects.
 */
export function getSettingCollectionSource(propSettings: SettingDefinitionCollection, object: PluginObject): SettingCollectionSource {
    return () => propSettings.map(({ name, isPluginBound }) => {
        const settingBinder = isPluginBound ? getPluginBinder(object, name, propSettings.pluginBinder!) : getDefaultBinder(object, name);
        return createSettingElement(name, settingBinder);
    });
}
