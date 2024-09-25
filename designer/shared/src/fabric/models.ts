import * as fabric from "fabric";

import { SettingProp } from "../setting";

/**
 * Represents the output of fabric.loadSVGFromString.
 *
 * This interface is used to define the shape of the output of fabric.loadSVGFromString.
 * The output is an object with two properties: objects and options.
 * The objects property is an array of fabric objects.
 * The options property is an object with additional options.
 */
export interface FabricSvg {
    /**
     * The array of fabric objects.
     */
    objects: fabric.Object[];
    /**
     * The additional options.
     */
    options: Record<string, unknown>;
}

/**
 * Represents the options of a plugin.
 * 
 * The options are key-value pairs of setting props.
 * The keys are the names of the settings and the values are the setting props.
 * 
 * @typedef {Object.<string, SettingProp>} PluginOptions
 */
export class PluginOptions implements Record<string, SettingProp> {
    /**
     * The setting props.
     * 
     * @type {Object.<string, SettingProp>}
     */
    [key: string]: SettingProp;

    /**
     * Converts the plugin options to a type {@link T}.
     * 
     * @template T The type to convert the plugin options to.
     * @param {PluginOptions} pluginOptions The plugin options to convert.
     * @returns {T} The converted plugin options.
     */
    static as<T>(pluginOptions: PluginOptions): T {
        return Object.keys(pluginOptions).reduce((seed, current) => {

            return {
                ...seed,
                [current]: pluginOptions[current].value
            };
        }, {} as T);
    }
};
