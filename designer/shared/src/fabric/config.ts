/**
 * Represents the colors used in the application.
 */
export const colors = {
    /**
     * The color of the selection border.
     */
    selectionColor: `gray`,
    /**
     * The background color of the label.
     */
    labelBackground: `white`,
    /**
     * The background color of the rectangle.
     */
    rectangleBackground: `red`,
};

/**
 * Represents the default style for the selection controls of newly created objects.
 */
export const selectionStyle = {
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
