import * as fabric from 'fabric';

/**
 * Represents a size with width and height properties.
 */
export type Size = {
    /** The width of the size. */
    width: number;
    /** The height of the size. */
    height: number;
};

/**
 * Represents a position with top and left properties.
 */
export type Position = {
    /** The top position of the object. */
    top: number;
    /** The left position of the object. */
    left: number;
};

/**
 * Returns the size of the viewport.
 * @returns {Size} The size of the viewport.
 */
export function getViewportSize(): Size {
    // Get the width and height of the viewport
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

/**
 * Calculates the center position of an object relative to the given reference size.
 * @param {fabric.Object} object - The object whose center needs to be calculated.
 * @param {Size} referenceSize - The size of the reference element.
 * @returns {Position} The center position of the object.
 */
export function calculateCenter(object: fabric.Object, referenceSize: Size): Position {
    // Calculate the center position of the object based on its size and reference size
    
    // Calculate the left position of the center by subtracting half of the object's width
    // from half of the reference size's width
    const left = referenceSize.width / 2 - object.width / 2;
    
    // Calculate the top position of the center by subtracting half of the object's height
    // from half of the reference size's height
    const top = referenceSize.height / 2 - object.height / 2;

    // Return the center position
    return { left, top };
}

