import * as fabric from "fabric";
import { createClipPath, getViewportSize, canvasDefaults } from "@labelbits/designer-shared/fabric";

/**
 * The BaseCanvas class is an abstract base class for label design spaces.
 * It provides methods to interact with the Fabric.js canvas, including resizing,
 * centering objects, and styling.
 *
 * @abstract
 */
export default abstract class BaseCanvas extends fabric.Canvas {
    public gridSize: number = 8;

    /**
     * The clip path used to restrict the rendering of objects on the canvas.
     * 
     * @protected
     * @type {fabric.Rect}
     */
    protected get labelArea(): fabric.Rect {
        // TODO: Throw an error if undefined
        return this.clipPath! as fabric.Rect;
    };

    /**
     * Creates a new design space and initializes the canvas.
     * It sets up the clip path, styles, event listeners, and renders the canvas.
     */
    constructor() {
        super('canvas', canvasDefaults);

        this.clipPath = createClipPath({ width: 750, height: 375 });

        this.matchViewport();
        this.registerEvents();

        this.renderAll();

        console.debug(`Canvas initialized.`);
    }

    public toObject(propertiesToInclude?: string[]) {
        return super.toObject([...propertiesToInclude ?? [], 'uid', 'plugin', 'relationship']);
    }

    /**
     * Calculates the nearest snap coordinate for the given single coordinate.
     * Rounds the given coordinate to the nearest grid size multiple.
     * @param {number} coord - The single coordinate to calculate the snap for.
     * @returns {number} The nearest snap coordinate.
     * @private
     */
    private _calculateSnapCoord(coord: number): number {

        return Math.round(coord / this.gridSize) * this.gridSize;
    }

    /**
     * Registers event listeners for the canvas.
     * Currently listens for the window resize event to adjust the canvas size.
     * 
     * @protected
     */
    protected registerEvents(): void {

        // Resize canvas on window resize
        window.addEventListener('resize', () => this.matchViewport());

        // Snap to grid
        this.on('object:moving', (e) => e.target.set({
            top: this._calculateSnapCoord(e.target.top),
            left: this._calculateSnapCoord(e.target.left)
        }));

        console.debug(`Canvas events registered.`);
    }

    /**
     * Resize the canvas and center the label area.
     * 
     * @protected
     */
    protected matchViewport(): void {

        this.setDimensions(getViewportSize());
        this.centerObject(this.labelArea);

        console.debug(`Canvas matched to viewport.`);
    }
}
