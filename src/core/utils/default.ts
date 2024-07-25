import * as fabric from 'fabric';
import JsBarcode from 'jsbarcode';

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

/**
 * Asynchronously creates a barcode and returns it as a Promise of a fabric.Object.
 *
 * @return {Promise<fabric.Object>} A Promise that resolves to a fabric.Object representing the barcode.
 */
export async function createBarcodeAsync(): Promise<fabric.Object> {

    // Generate the barcode
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    JsBarcode(svg, "barcode", { format: "CODE128", displayValue: true });

    // Convert the SVG node to a string
    const serializer = new XMLSerializer();
    const barcodeSVG = serializer.serializeToString(svg);

    const svgOutput = await fabric.loadSVGFromString(barcodeSVG);

    return fabric.util.groupSVGElements(svgOutput.objects as fabric.Object[], svgOutput.options);
}
