import * as fabric from "fabric";
import { colors } from "./config";

/**
 * Creates a new `fabric.Rect` object to be used as a clipping path.
 * The rectangle will have default properties suitable for clipping other objects
 * within the canvas and ensuring they do not extend beyond its boundaries.
 *
 * @returns {fabric.Rect} The created rectangle object, which can be used as a clipping path.
 */
export function createClipPath(): fabric.Rect {
    return new fabric.Rect({
        fill: colors.labelBackground, // The color with which the rectangle will be filled
        selectable: false, // Whether the rectangle can be selected
        hoverCursor: `default`, // The cursor to display when hovering over the rectangle
    });
}

/**
 * Creates a new `fabric.Rect` object representing a rectangle with default properties.
 * This rectangle can be added to the canvas and will have a fixed size and background color.
 *
 * @returns {fabric.Rect} The created rectangle object, which can be added to the canvas.
 */
export function createRectangle(): fabric.Rect {
    return new fabric.Rect({
        /**
         * The color with which the rectangle will be filled.
         * @type {string}
         */
        fill: colors.rectangleBackground,
        /**
         * The width of the rectangle in pixels.
         * @type {number}
         */
        width: 125,
        /**
         * The height of the rectangle in pixels.
         * @type {number}
         */
        height: 125,
    });
}
