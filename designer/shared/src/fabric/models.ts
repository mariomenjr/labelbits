import * as fabric from "fabric";

/**
 * Represents the output of an SVG, containing the elements and options to be used.
 * 
 * @typedef {Object} SvgOuput
 * @property {fabric.Object[]} objects - An array of `fabric.Object` instances representing the SVG elements.
 * @property {Record<string, unknown>} options - A record of additional options to apply to the `fabric.Object`.
 */
export type SvgOuput = {
    objects: fabric.Object[],
    options: Record<string, unknown>
};
