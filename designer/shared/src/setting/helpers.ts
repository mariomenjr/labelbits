import { IPluginObject } from "../fabric";
import { camelToKebabCase, camelToTitleCase } from "../main/strings";
import { Setting, SettingBinder, SettingType } from "./models";

const SettingToInputMap: { [key: string]: string } = {
    string: "text",
    number: "number",
    boolean: "checkbox",
};

/**
 * Maps a SettingType to a string that represents the HTML input element type that is
 * most suitable for editing a value of that type.
 *
 * The mapping is as follows:
 * - string: "text"
 * - number: "number"
 * - boolean: "checkbox"
 * - Any other type: "text" (default)
 *
 * @param {SettingType} type - The SettingType to map to an HTML input element type.
 * @returns {string} The HTML input element type as a string.
 */
function SettingToInputType(type: SettingType): string {
    const k = type.constructor.name.toLowerCase()
    return SettingToInputMap[k] ?? "text"; // Default to "text" if type not found
}

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
        type: SettingToInputType(settingBinder.getValue()),

        get value() {
            return settingBinder.getValue();
        },

        set value(v) {
            settingBinder.setValue(v);
        }
    };
}

/**
 * Returns an array of setting objects bound to the properties of the given plugin object.
 *
 * Each setting object in the array represents a property of the plugin object, and contains
 * a label, id, and type, as well as methods to get and set the property's value.
 *
 * The setting objects are bound to the plugin object's properties in the following way:
 *
 * - For native properties, the setting object's getValue and setValue methods are bound to the
 *   plugin object's get and set methods.
 * - For plugin properties, the setting object's getValue method is bound to the plugin object's
 *   property value, and the setting object's setValue method is bound to the plugin object's
 *   updateObjectAsync method.
 *
 * @param {T} self - The plugin object whose properties are to be bound to setting objects.
 * @returns {Setting[]} An array of setting objects bound to the properties of the plugin object.
 */
export function getBoundSettingHandlers<T extends IPluginObject>(self: T): Setting[] {
    return Object.keys(self.plugin).map(k => {
        const prop = self.plugin[k];

        // Native binder
        if (prop.isNative) return createSettingElement(k, {
            getValue: () => self.get(k),
            setValue: (v: SettingType) => {
                self.set(k, v);
                self.plugin[k].value = v;

                self.setCoords();
                self.canvas?.requestRenderAll();
                self.fire('modified');
            }
        });

        // Plugin binder
        return createSettingElement(k, {
            getValue: () => self.plugin[k].value!,
            setValue: async (v: SettingType) => {
                self.plugin[k].value = v;

                const uo = await self.updateObjectAsync(k, self.plugin[k]);

                uo.setCoords();
                uo.canvas?.requestRenderAll();
                uo.fire('modified');
            }
        });
    });
}
