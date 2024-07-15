import * as fabric from 'fabric';

/**
 * Creates a new fabric Rectangle object with default properties.
 *
 * @returns {fabric.Rect} The created rectangle object.
 */
export function createRectangle() {
    return new fabric.Rect({
        left: 100, // x-coordinate of the rectangle's leftmost point
        top: 100, // y-coordinate of the rectangle's topmost point
        fill: 'red', // color of the rectangle
        width: 20, // width of the rectangle
        height: 20 // height of the rectangle
    });
}

/**
 * Creates a new fabric Textbox object with default properties.
 *
 * @param {string} [text='New Text'] - The default text content of the textbox.
 * @returns {fabric.Textbox} The created textbox object.
 */
export function createTextbox(text = `New Text`) {
    return new fabric.Textbox(text, {
        left: 50, // x-coordinate of the textbox's leftmost point
        top: 50, // y-coordinate of the textbox's topmost point
        width: 150, // width of the textbox
        fontSize: 20 // font size of the textbox
    });
}
