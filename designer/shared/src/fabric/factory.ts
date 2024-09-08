import * as fabric from "fabric";

import { colors } from "./config";

/**
 * Creates a new fabric.Rect object with default properties.
 * This object is used to clip other objects within the canvas.
 *
 * @return {fabric.Rect} The created rectangle object.
 */
export function createClipPath(): fabric.Rect {
    return new fabric.Rect({
        fill: colors.labelBackground, // The color with which the rectangle will be filled
        selectable: false, // Whether the rectangle can be selected
        hoverCursor: `default`, // The cursor to display when hovering over the rectangle
    });
}

/**
 * Creates a new fabric Rectangle object with default properties.
 *
 * @returns {fabric.Rect} The created rectangle object.
 */
export function createRectangle(): fabric.Rect {
    return new fabric.Rect({
        /**
         * The color with which the rectangle will be filled.
         */
        fill: colors.rectangleBackground,
        /**
         * The width of the rectangle.
         */
        width: 125,
        /**
         * The height of the rectangle.
         */
        height: 125,
    });
}
