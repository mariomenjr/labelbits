import { IPluginObject, PluginGroup, PluginTextbox } from "../fabric";
import { camelToKebabCase, camelToTitleCase } from "../main/strings";
import { Setting, SettingBinder, SettingType } from "./models";

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
