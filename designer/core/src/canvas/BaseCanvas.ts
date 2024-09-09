import * as fabric from "fabric";
import {
    createClipPath,
    calculateCenter,
    getViewportSize,
    Size
} from "@labelbits/designer-shared/fabric";

/**
 * The BaseCanvas class is an abstract base class for label design spaces.
 * It provides methods to interact with the Fabric.js canvas, including resizing,
 * centering objects, and styling.
 *
 * @abstract
 */
export default abstract class BaseCanvas {
    /**
     * The Fabric.js canvas object.
     * 
     * @protected
     * @type {fabric.Canvas}
     */
    protected canvas: fabric.Canvas;

    /**
     * The clip path used to restrict the rendering of objects on the canvas.
     * 
     * @protected
     * @type {fabric.Rect}
     */
    protected labelArea: fabric.Rect;

    /**
     * Creates a new design space and initializes the canvas.
     * It sets up the clip path, styles, event listeners, and renders the canvas.
     */
    constructor() {
        this.canvas = new fabric.Canvas(`canvas`);
        this.labelArea = createClipPath();
        this.canvas.add(this.labelArea);

        this.styleCanvas();
        this.resizeCanvas();
        this.registerCanvasEvents();
        this.canvas.renderAll();

        console.log(`Canvas initialized.`);
    }

    /**
     * Returns the size of the canvas.
     * 
     * @protected
     * @type {Size}
     * @returns {Size} The current size of the canvas.
     */
    protected get canvasSize(): Size {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    /**
     * Renders the clip path on the canvas.
     * Sets the size and position of the clip path based on a fixed element size.
     */
    protected centerClip(): void {
        const elementSize: Size = { width: 500, height: 250 }; // TODO: Get actual label size

        this.centerObject(this.labelArea.set({
            ...elementSize,
            absolutePositioned: true
        }));
    }

    /**
     * Centers the specified object on the canvas.
     * 
     * @protected
     * @param {fabric.Object} object - The object to center on the canvas.
     */
    protected centerObject(object: fabric.Object): void {
        const center = calculateCenter(object, this.canvasSize);
        object.set({ ...center }).setCoords();
    }

    /**
     * Registers event listeners for the canvas.
     * Currently listens for the window resize event to adjust the canvas size.
     * 
     * @protected
     */
    protected registerCanvasEvents(): void {
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resizes the canvas to fit the current viewport size.
     * Also re-centers the clip path after resizing.
     * 
     * @protected
     */
    protected resizeCanvas(): void {
        this.canvas.setDimensions(getViewportSize());
        this.centerClip();
    }

    /**
     * Styles the canvas.
     * Sets the background color of the canvas to a light gray.
     * 
     * @protected
     */
    protected styleCanvas(): void {
        this.canvas.backgroundColor = `rgb(209 213 219)`;
    }
}
