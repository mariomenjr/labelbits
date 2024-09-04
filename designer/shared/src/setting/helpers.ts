
import { camelToKebabCase, camelToTitleCase } from "../main/strings";
import { Setting, SettingBinder } from "./models";

/**
 * Creates a new setting object from a property name and a setting binder.
 *
 * @param propName The name of the property associated with the setting.
 * @param settingBinder The setting binder.
 *
 * @returns The new setting object.
 */
export function createSetting(propName: string, settingBinder: SettingBinder): Setting {
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
