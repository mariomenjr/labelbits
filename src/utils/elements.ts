import * as fabric from 'fabric';

/**
 * Represents a size with width and height properties.
 */
export type Size = { width: number, height: number };

/**
 * Represents a position with top and left properties.
 */
export type Position = { top: number, left: number };

/**
 * Returns the size of the viewport.
 */
export function getViewportSize(): Size {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

/**
 * Calculates the center position of an object relative to the given reference size.
 * @param {fabric.Object} object The object whose center needs to be calculated.
 * @param {Size} referenceSize The size of the reference element.
 * @returns {Position} The center position of the object.
 */
export function calculateCenter(object: fabric.Object, referenceSize: Size): Position {

    return {
        left: referenceSize.width / 2 - object.width / 2,
        top: referenceSize.height / 2 - object.height / 2
    };
}
