import * as fabric from "fabric";

import { SettingProp } from "../setting";

/**
 * Represents the output of an SVG, containing the elements and options to be used.
 * 
 * @typedef {Object} FabricSvg
 * @property {fabric.Object[]} objects - An array of `fabric.Object` instances representing the SVG elements.
 * @property {Record<string, unknown>} options - A record of additional options to apply to the `fabric.Object`.
 */
export type FabricSvg = {
    objects: fabric.Object[],
    options: Record<string, unknown>
};

export class PluginOptions implements Record<string, SettingProp> {
    [key: string]: SettingProp;

    static as<T>(pluginOptions: PluginOptions): T {
        return Object.keys(pluginOptions).reduce((seed, current) => {

            return {
                ...seed,
                [current]: pluginOptions[current].value
            };
        }, {} as T);
    }
};
