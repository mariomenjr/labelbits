import * as fabric from 'fabric';
import { createClipPath } from '../utils/default';
import { calculateCenter, getViewportSize, Size } from '../utils/elements';

export default abstract class Space {

    /**
     * The Fabric.js canvas object.
     */
    protected canvas: fabric.Canvas;

    /**
     * The clip path used to restrict the rendering of objects on the canvas.
     */
    protected clipPath: fabric.Rect;

    constructor() {

        this.canvas = new fabric.Canvas(`canvas`);
        this.clipPath = createClipPath();

        this.canvas.add(this.clipPath);

        this.styleCanvas();
        this.resizeCanvas();
        this.registerEvents();

        this.canvas.renderAll();

        console.log(`Canvas initialized.`);
    }

    /**
     * Returns the size of the canvas.
     * @returns {Size} The size of the canvas.
     */
    protected get canvasSize(): Size {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    /**
     * Centers the object on the canvas.
     * 
     * @param {fabric.Object} object - The object to be centered.
     */
    protected centerObject(object: fabric.Object): void {
        const center = calculateCenter(object, this.canvasSize);
        object.set({ ...center }).setCoords();
    }

    /**
     * Registers event listeners for the canvas.
     */
    protected registerEvents(): void {
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Styles the canvas.
     */
    protected styleCanvas(): void {
        this.canvas.backgroundColor = `rgb(209 213 219)`;
    }

    /**
     * Resizes the canvas to fit the viewport.
     */
    protected resizeCanvas(): void {
        // Resize canvas
        this.canvas.setDimensions(getViewportSize());

        // Recenter clip path
        this.centerClip();
        // this.canvas.getObjects().forEach((object) => object.setCoords());
    }

    /**
     * Renders the clip path on the canvas.
     */
    protected centerClip(): void {
        const elementSize: Size = { width: 500, height: 250 }; // TODO: Get label size.

        this.centerObject(this.clipPath.set({
            ...elementSize,
            absolutePositioned: true
        }));
    }
}