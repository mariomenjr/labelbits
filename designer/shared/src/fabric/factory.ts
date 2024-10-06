import * as fabric from "fabric";

import { colors } from "./config";
import { Size } from "./window";

/**
 * Creates a clip path rectangle to restrict the rendering of objects on the canvas.
 * @param size The size of the clip path.
 * @returns A fabric.Rect object representing the clip path.
 */
export function createClipPath(size: Size): fabric.Rect {
    return new fabric.Rect({
        fill: colors.labelBackground, // The color with which the rectangle will be filled
        selectable: false, // Whether the rectangle can be selected
        hoverCursor: `default`, // The cursor to display when hovering over the rectangle
        absolutePositioned: true, // Whether the rectangle is absolutely positioned
        ...size
    });
}
