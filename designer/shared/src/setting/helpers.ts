import { FabricObjectProcessorAsync, PluginObject } from "../fabric";
import { camelToKebabCase, camelToTitleCase } from "../main/strings";
import { Setting, SettingBinder, SettingType, SettingCollectionSource, SettingDefinitionCollection } from "./models";

/**
 * Creates a new setting object that represents a property of a fabric object.
 *
 * @param propName The name of the property associated with the setting.
 * @param settingBinder The setting binder.
 *
 * @returns The new setting object.
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
 * Binds a property of the fabric object to a setting.
 * @param object The fabric object.
 * @param propName The name of the property.
 * @returns A setting binder object.
 */
export function getDefaultBinder(object: PluginObject, propName: string): SettingBinder {
    return {
        /**
         * Retrieves the value of the property.
         * @returns The value of the property.
         */
        getValue(): SettingType {
            return object.get(propName);
        },

        /**
         * Sets the value of the property.
         * @param v The new value of the property.
         */
        setValue(v: SettingType) {
            object.set(propName, v);

            object.setCoords();
            object.canvas?.requestRenderAll();
            object.fire('modified');
        }
    };
}

export function getPluginBinder(object: PluginObject, propName: string, bindingProcessorAsync: FabricObjectProcessorAsync): SettingBinder {
    const binder = getDefaultBinder(object, propName);

    return {
        ...binder,
        async setValue(v: SettingType) {
            object.set(propName, v);

            const { left, top, scaleX, scaleY, angle, flipX, flipY } = object;

            const updatedObject = await bindingProcessorAsync(object);

            updatedObject.set({ left, top, scaleX, scaleY, angle, flipX, flipY });

            updatedObject.setCoords();
            updatedObject.canvas?.requestRenderAll();
            updatedObject.fire('modified');
        }
    };
}

/**
 * Retrieves the settings source for the fabric object.
 * @param propSettings The collection of setting definitions.
 * @param object The fabric object.
 * @returns A function that returns an array of settings.
 */
export function getSettingCollectionSource(propSettings: SettingDefinitionCollection, object: PluginObject): SettingCollectionSource {
    return () => propSettings.map(({ name, isPluginBound }) => {

        const settingBinder = isPluginBound ? getPluginBinder(object, name, propSettings.pluginBinder!) : getDefaultBinder(object, name);
        return createSettingElement(name, settingBinder);
    });
}

