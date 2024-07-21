import * as fabric from 'fabric';

/**
 * The default style for the selection controls of newly created objects.
 */
const selectionStyle = {
    /**
     * The color of the selection border.
     */
    borderColor: 'gray',
    /**
     * The color of the selection corners.
     */
    cornerColor: 'gray',
    /**
     * The size of the selection corners.
     */
    cornerSize: 8,
    /**
     * Whether the selection corners are transparent.
     */
    transparentCorners: true
};

/**
 * Creates a new fabric Rectangle object with default properties.
 *
 * @returns {fabric.Rect} The created rectangle object.
 */
export function createRectangle(): fabric.Rect {
    return new fabric.Rect({
        /**
         * The x-coordinate of the rectangle's leftmost point.
         */
        left: 100,
        /**
         * The y-coordinate of the rectangle's topmost point.
         */
        top: 100,
        /**
         * The color of the rectangle.
         */
        fill: 'red',
        /**
         * The width of the rectangle.
         */
        width: 20,
        /**
         * The height of the rectangle.
         */
        height: 20,

        ...selectionStyle
    });
}

/**
 * Creates a new fabric Textbox object with default properties.
 *
 * @param {string} [text='New Text'] - The default text content of the textbox.
 * @returns {fabric.Textbox} The created textbox object.
 */
export function createTextbox(text: string = `New Text`): fabric.Textbox {
    return new fabric.Textbox(text, {
        /**
         * The x-coordinate of the textbox's leftmost point.
         */
        left: 50,
        /**
         * The y-coordinate of the textbox's topmost point.
         */
        top: 50,
        /**
         * The width of the textbox.
         */
        width: 150,
        /**
         * The font size of the textbox.
         */
        fontSize: 20,

        ...selectionStyle,
    });
}

