import * as fabric from "fabric";

/**
 * Represents a size with width and height properties.
 * 
 * @typedef {Object} Size
 * @property {number} width - The width of the size.
 * @property {number} height - The height of the size.
 */
export type Size = {
    /** The width of the size. */
    width: number;
    /** The height of the size. */
    height: number;
};

/**
 * Represents a position with top and left properties.
 * 
 * @typedef {Object} Position
 * @property {number} top - The top position of the object.
 * @property {number} left - The left position of the object.
 */
export type Position = {
    /** The top position of the object. */
    top: number;
    /** The left position of the object. */
    left: number;
};

/**
 * Returns the size of the viewport.
 * 
 * @returns {Size} The size of the viewport, including its width and height.
 */
export function getViewportSize(): Size {
    // Get the width and height of the viewport
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}
