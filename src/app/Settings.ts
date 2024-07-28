import { camelToKebabCase, camelToTitleCase } from "../utils/strings";

import Element from "../interfaces/Element";
import Collection from "../interfaces/Collection";

/**
 * Represents the type of a setting value.
 */
type SettingType = number | string;

/**
 * Represents a setting for the label designer.
 */
interface Setting extends Element {
    /**
     * The label of the setting.
     */
    label: string;

    /**
     * The name of the property associated with the setting.
     */
    propName: string;

    /**
     * The value of the setting.
     */
    value: SettingType;

    /**
     * The type of the setting value.
     */
    type: string;
}

/**
 * Creates a new setting object.
 *
 * @param {string} propName - The name of the property associated with the setting.
 * @param {SettingType} value - The value of the setting.
 * @returns {Setting} The created setting object.
 */
function createSetting(propName: string, value: SettingType): Setting {
    return {
        id: `sg-` + camelToKebabCase(propName),
        label: camelToTitleCase(propName),
        propName: propName,
        value: value,
        type: value.constructor.name.toLowerCase(),
    };
}

export default class Settings extends Collection<Setting> {}

