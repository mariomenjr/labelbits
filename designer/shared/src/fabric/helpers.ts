import * as fabric from "fabric";
import { FabricSvg } from "./models";
import { PluginGroup, PluginOptions } from ".";

/**
 * Replaces the contents of the specified object with the contents of the specified fabric SVG.
 * Preserves the position, scale, and rotation of the original object.
 * 
 * @param {T} object - The object to be replaced.
 * @param {FabricSvg} fabricSvg - The fabric SVG object to be used as the replacement.
 * @returns {T} The replaced object.
 */
export function replaceSvg<T extends PluginGroup>(object: T, fabricSvg: FabricSvg): T {

    const { left, top, scaleX, scaleY, angle, flipX, flipY } = object;

    object.removeAll();
    object.add(...fabricSvg.objects);

    object.set({ ...fabricSvg.options, left, top, scaleX, scaleY, angle, flipX, flipY });

    return object;
}

/**
 * Loads the specified SVG string asynchronously into Fabric.js objects.
 * Returns a FabricSvg object, which contains the loaded objects and options.
 * The objects are grouped into a single group object.
 * The options are the default Fabric.js options for the loaded objects, plus the specified plugin options.
 *
 * @param {string} svgString - The SVG string to be loaded.
 * @param {PluginOptions} options - The plugin options.
 * @returns {Promise<FabricSvg>} A promise that resolves to the loaded FabricSvg object.
 */
export async function buildFabricSvgAsync(svgString: string, options: PluginOptions): Promise<FabricSvg> {
    const svgOutput = await fabric.loadSVGFromString(svgString);

    // Group the SVG objects into a single group object
    return { 
        objects: svgOutput.objects as fabric.Object[], 
        options: { 
            ...svgOutput.options, 
            ...{
                plugin: options
            }
        } 
    };
}
