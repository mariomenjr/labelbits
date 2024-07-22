import * as fabric from 'fabric';

export const colors = {
    selectionColor: `gray`,
    labelBackground: `white`,
    rectangleBackground: `red`,
};

/**
 * The default style for the selection controls of newly created objects.
 */
const selectionStyle = {
    /**
     * The color of the selection border.
     */
    borderColor: colors.selectionColor,
    /**
     * The color of the selection corners.
     */
    cornerColor: colors.selectionColor,
    /**
     * The size of the selection corners.
     */
    cornerSize: 6,
    /**
     * Whether the selection corners are transparent.
     */
    transparentCorners: true
};

/**
 * Creates a new fabric.Rect object with default properties.
 *
 * @return {fabric.Rect} The created rectangle object.
 */
export function createClipPath(): fabric.Rect {
    return new fabric.Rect({

        fill: colors.labelBackground,
        selectable: false,
        hoverCursor: 'default',
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
         * The color of the rectangle.
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
        fontSize: 16,

        ...selectionStyle,
    });
}

