import { IPluginObject } from "../fabric";
import { camelToKebabCase, camelToTitleCase } from "../main/strings";
import { Setting, SettingAllowedTypes, SettingBinder, SettingProp, SettingType } from "./models";

/**
 * Determines the allowed type of a setting based on the provided property configuration and binder.
 *
 * @param {SettingProp} settingProp - The configuration options for the setting.
 * @param {SettingBinder} settingBinder - The binder that provides the current value of the setting.
 * @returns {SettingAllowedTypes} The determined setting type (e.g., "array", "textarea", etc.).
 */
export function getSettingType(settingProp: SettingProp, settingBinder: SettingBinder): SettingAllowedTypes {
    return Array.isArray(settingProp.select?.values)
        ? "array"
        : settingProp.textarea
            ? "textarea"
            : (typeof settingBinder.getValue() as SettingAllowedTypes); // TODO: double check
}

/**
 * Creates a new setting object that represents a property of a Fabric.js object.
 *
 * The setting object includes metadata such as the property name, label, and type, and provides
 * methods to get and set the value of the associated property.
 *
 * @param {string} propName - The name of the property to create the setting for.
 * @param {SettingProp} settingProp - The configuration of the property, including type and possible options.
 * @param {SettingBinder} settingBinder - An object that manages getting and setting the property's value.
 * 
 * @returns {Setting} The constructed setting object, bound to the specified property.
 */
export function createSettingElement(propName: string, settingProp: SettingProp, settingBinder: SettingBinder): Setting {

    // Determine the type of the setting (e.g., "array", "textarea").
    const settingType: SettingAllowedTypes = getSettingType(settingProp, settingBinder);

    // Initialize the setting object with default values and accessor methods.
    const setting: Setting = {
        propName,
        id: camelToKebabCase(propName),
        label: camelToTitleCase(propName),
        type: "text", // Default to "text", will be overridden below if needed.
        /**
         * Retrieves the current value of the setting.
         * 
         * @returns {SettingType} The current value of the setting.
         */
        get value() {
            return settingBinder.getValue();
        },

        /**
         * Sets a new value for the setting.
         * 
         * @param {SettingType} v - The new value to set.
         */
        set value(v: SettingType) {
            settingBinder.setValue(v);
        }
    };

    // Adjust the setting type and any specific configuration based on the determined type.
    switch (settingType) {
        case "number":
            setting.type = "number";
            return setting;

        case "boolean":
            setting.type = "checkbox";
            return setting;

        case "array":
            setting.type = "select";
            setting.select = settingProp.select?.values;
            return setting;

        case "textarea":
            setting.type = "textarea";
            setting.textarea = settingProp.textarea;
            return setting;

        default:
            setting.type = "text";
            return setting;
    }
}

/**
 * Generates an array of setting objects, each bound to a property of the given plugin object.
 * 
 * These settings represent both native properties and plugin-specific properties of the object. The
 * setting objects provide methods for retrieving and updating the values of these properties.
 *
 * - For native properties, the setting object binds to the plugin's `get` and `set` methods.
 * - For plugin-specific properties, the setting object binds to the `updateObjectAsync` method.
 *
 * @template T
 * @param {T} self - The plugin object whose properties are to be converted into settings.
 * @returns {Setting[]} An array of setting objects, each representing a property of the plugin.
 */
export function getBoundSettingHandlers<T extends IPluginObject>(self: T): Setting[] {
    return Object.keys(self.plugin).sort().map(k => {
        const prop = self.plugin[k];

        // Native binder: Create a setting for native properties, binding to get and set methods.
        if (prop.isNative) {
            return createSettingElement(k, prop, {
                getValue: () => self.get(k),
                setValue: (v: SettingType) => {
                    self.set(k, v);
                    self.plugin[k].value = v;

                    // Update the object's coordinates and re-render the canvas.
                    self.setCoords();
                    self.canvas?.requestRenderAll();
                    self.fire('modified');
                }
            });
        }

        // Plugin binder: Create a setting for plugin-specific properties, binding to async update.
        return createSettingElement(k, prop, {
            getValue: () => self.plugin[k].value!,
            setValue: async (v: SettingType) => {
                self.plugin[k].value = v;

                // Update the object asynchronously and refresh its coordinates.
                const o = await self.updateObjectAsync(k, self.plugin[k]);

                o.setCoords();
                o.canvas?.requestRenderAll();
                o.fire('modified');
            }
        });
    });
}
