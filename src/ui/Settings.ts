import LabelDesigner from "../core/LabelDesigner";
import { camelToKebabCase, camelToTitleCase } from "../core/utils/strings";
import Designee from "../models/Designee";
import Element from "../models/Element";
import Options from "../models/Options";

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

/**
 * The Settings class represents the settings panel for the label designer.
 * It extends the Designee class and implements the Options interface.
 */
export default class Settings extends Designee implements Options<Setting> {
    /**
     * The controls array contains the settings for the label designer.
     * Each setting is an object with label, value, and type properties.
     */
    controls: Setting[];

    /**
     * Constructs a new Settings instance.
     *
     * @param {LabelDesigner} designer - The label designer instance that the settings panel is associated with.
     */
    constructor(designer: LabelDesigner) {
        super(designer);

        // Initialize the controls array with default settings
        this.controls = [
            createSetting(`charSpacing`, 0),
            createSetting(`fontSize`, 0),
        ];
    }
}

