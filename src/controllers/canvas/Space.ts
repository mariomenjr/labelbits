import * as fabric from "fabric";

import { calculateCenter, getViewportSize, Size } from "../../utils/elements";
import { createClipPath } from "../../utils/default";

/**
 * The Space class is an abstract base class for label design spaces.
 * It provides methods to interact with the Fabric.js canvas.
 */
export default abstract class Space {
    /**
     * The Fabric.js canvas object.
     */
    protected canvas: fabric.Canvas;

    /**
     * The clip path used to restrict the rendering of objects on the canvas.
     */
    protected labelArea: fabric.Rect;

    /**
     * Creates a new space.
     */
    constructor() {
        // Create a new canvas
        this.canvas = new fabric.Canvas(`canvas`);

        // Create a new clip path
        this.labelArea = createClipPath();

        // Add the clip path to the canvas
        this.canvas.add(this.labelArea);

        // Style the canvas and resize it
        this.styleCanvas();
        this.resizeCanvas();

        // Register canvas events
        this.registerCanvasEvents();

        // Render the canvas
        this.canvas.renderAll();

        // Log initialization message
        console.log(`Canvas initialized.`);
    }

    /**
     * Returns the size of the canvas.
     * @returns {Size} The size of the canvas.
     */
    protected get canvasSize(): Size {
        // Get the width and height of the canvas
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    /**
     * Renders the clip path on the canvas.
     */
    protected centerClip(): void {
        // TODO: Get label size
        const elementSize: Size = { width: 500, height: 250 };

        // Set the size and position of the clip path
        this.centerObject(this.labelArea.set({
            ...elementSize,
            absolutePositioned: true
        }));
    }

    /**
     * Centers the specified object on the canvas.
     * 
     * @param {fabric.Object} object - The object to center.
     */
    protected centerObject(object: fabric.Object): void {
        // Calculate the center of the object based on its size and canvas size
        const center = calculateCenter(object, this.canvasSize);

        // Set the object's position and coordinates
        object.set({ ...center }).setCoords();
    }

    /**
     * Registers event listeners for the canvas.
     */
    protected registerCanvasEvents(): void {
        // Register a resize event listener for the window
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resizes the canvas to fit the viewport.
     */
    protected resizeCanvas(): void {
        // Resize the canvas to fit the viewport
        this.canvas.setDimensions(getViewportSize());

        // Recenter the clip path
        this.centerClip();
    }

    /**
     * Styles the canvas.
     */
    protected styleCanvas(): void {
        // Set the background color of the canvas
        this.canvas.backgroundColor = `rgb(209 213 219)`;
    }
}

