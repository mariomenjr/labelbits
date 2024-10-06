/**
 * Represents the colors used in the application.
 * This object contains color definitions for various UI elements.
 * 
 * @typedef {Object} Colors
 * @property {string} selectionColor - The color of the selection border.
 * @property {string} labelBackground - The background color of the label.
 * @property {string} rectangleBackground - The background color of the rectangle.
 */
export const colors = {
    /**
     * The color of the selection border.
     * @type {string}
     */
    selectionColor: `gray`,

    /**
     * The background color of the label.
     * @type {string}
     */
    labelBackground: `white`,

    /**
     * The background color of the rectangle.
     * @type {string}
     */
    rectangleBackground: `red`,
};

/**
 * Represents the default style for the selection controls of newly created objects.
 * This object defines the appearance of selection borders and corners.
 * 
 * @typedef {Object} SelectionStyle
 * @property {string} borderColor - The color of the selection border.
 * @property {string} cornerColor - The color of the selection corners.
 * @property {number} cornerSize - The size of the selection corners.
 * @property {boolean} transparentCorners - Whether the selection corners are transparent.
 */
export const selectionStyle = {
    /**
     * The color of the selection border.
     * @type {string}
     */
    borderColor: colors.selectionColor,

    /**
     * The color of the selection corners.
     * @type {string}
     */
    cornerColor: colors.selectionColor,

    /**
     * The size of the selection corners.
     * @type {number}
     */
    cornerSize: 6,

    /**
     * Whether the selection corners are transparent.
     * @type {boolean}
     */
    transparentCorners: true
};

/** 
 * Represents the default style for the canvas.
 * This object defines the appearance of the canvas.
 * @typedef {Object} CanvasDefaults
 * @property {boolean} fireRightClick - Whether the canvas should fire right click events.
 * @property {boolean} fireMiddleClick - Whether the canvas should fire middle click events.
 * @property {boolean} stopContextMenu - Whether the canvas should stop the context menu event.
 * @property {string} backgroundColor - The background color of the canvas.
*/
export const canvasDefaults = {
    fireRightClick: true,
    fireMiddleClick: true,
    stopContextMenu: true,
    backgroundColor: `rgb(209 213 219)`,
};
