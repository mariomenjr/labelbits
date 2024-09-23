import * as fabric from "fabric";
import { FabricSvg } from "./models";
import { PluginGroup, PluginOptions } from ".";

/**
 * Replaces the contents of a `fabric.Object` with elements from an SVG.
 * This function updates the properties of the provided fabric object and replaces
 * its current children with those extracted from the SVG.
 * 
 * @param {fabric.Object} object - The `fabric.Object` to be updated with SVG data.
 * @param {FabricSvg} fabricSvg - The SVG output containing the new objects and options.
 * @returns {fabric.Object} The updated `fabric.Object` with replaced SVG elements.
 */
export function replaceSvg<T extends PluginGroup>(object: T, fabricSvg: FabricSvg): T {

    const { left, top, scaleX, scaleY, angle, flipX, flipY } = object;

    object.removeAll();
    object.add(...fabricSvg.objects);

    object.set({ ...fabricSvg.options, left, top, scaleX, scaleY, angle, flipX, flipY });

    return object;
}

/**
 * Builds a `FabricSvg` object from an SVG string asynchronously.
 * The Fabric.js library is used to load the SVG string into an SVG object.
 * The `FabricSvg` object is then created by grouping the SVG elements into a single group object.
 * 
 * @param {string} svgString - The SVG string to be loaded.
 * @returns {Promise<FabricSvg>} A promise that resolves to the created `FabricSvg` object.
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
