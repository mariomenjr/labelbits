import * as fabric from "fabric";

import { SvgOuput } from "./models";

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