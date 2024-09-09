import * as fabric from "fabric";
import { SvgOuput } from "./models";

/**
 * Replaces the contents of a `fabric.Object` with elements from an SVG.
 * This function updates the properties of the provided fabric object and replaces
 * its current children with those extracted from the SVG.
 * 
 * @param {fabric.Object} object - The `fabric.Object` to be updated with SVG data.
 * @param {SvgOuput} svgOuput - The SVG output containing the new objects and options.
 * @returns {fabric.Object} The updated `fabric.Object` with replaced SVG elements.
 */
export function replaceSvg(object: fabric.Object, svgOuput: SvgOuput): fabric.Object {
    // Set the options of the object from the SVG
    object.set({
        // Set the objects of the group to the SVG elements
        objects: svgOuput.objects,
        // Set the other options from the SVG
        ...svgOuput.options,
    });

    // Remove all the current objects from the group
    const svgGroup = object as unknown as fabric.Group;
    svgGroup.remove(...svgGroup.getObjects());

    // Add the new SVG elements to the group
    svgGroup.add(...svgOuput.objects);

    return svgGroup;
}
