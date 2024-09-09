import * as fabric from "fabric";
import { FabricSvg } from "./models";

/**
 * Replaces the contents of a `fabric.Object` with elements from an SVG.
 * This function updates the properties of the provided fabric object and replaces
 * its current children with those extracted from the SVG.
 * 
 * @param {fabric.Object} object - The `fabric.Object` to be updated with SVG data.
 * @param {FabricSvg} fabricSvg - The SVG output containing the new objects and options.
 * @returns {fabric.Object} The updated `fabric.Object` with replaced SVG elements.
 */
export function replaceSvg(object: fabric.Object, fabricSvg: FabricSvg): fabric.Object {
    // Set the options of the object from the SVG
    object.set({
        // Set the objects of the group to the SVG elements
        objects: fabricSvg.objects,
        // Set the other options from the SVG
        ...fabricSvg.options,
    });

    // Remove all the current objects from the group
    const svgGroup = object as unknown as fabric.Group;
    svgGroup.remove(...svgGroup.getObjects());

    // Add the new SVG elements to the group
    svgGroup.add(...fabricSvg.objects);

    return svgGroup;
}

/**
 * Builds a `FabricSvg` object from an SVG string asynchronously.
 * The Fabric.js library is used to load the SVG string into an SVG object.
 * The `FabricSvg` object is then created by grouping the SVG elements into a single group object.
 * 
 * @param {string} svgString - The SVG string to be loaded.
 * @returns {Promise<FabricSvg>} A promise that resolves to the created `FabricSvg` object.
 */
export async function buildFabricSvgAsync(svgString: string): Promise<FabricSvg> {
    const svgOutput = await fabric.loadSVGFromString(svgString);

    // Group the SVG objects into a single group object
    return { objects: svgOutput.objects as fabric.Object[], options: svgOutput.options };
}