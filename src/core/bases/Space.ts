import * as fabric from 'fabric';
import { createClipPath } from '../utils/default';
import { calculateCenter, getViewportSize, Size } from '../utils/elements';

export type TransformingObject = fabric.Object & {
    relationship: fabric.TMat2D
};

/**
 * The Space class is an abstract base class for label design spaces.
 * It provides methods to interact with the Fabric.js canvas and the
 * Alpine.js application.
 */
/**
 * The Space class is an abstract base class for label design spaces.
 * It provides methods to interact with the Fabric.js canvas and the
 * Alpine.js application.
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
     * Centers the specified object on the canvas.
     * 
     * @param {fabric.Object} object - The object to center.
     */
    private centerObject(object: fabric.Object): void {
        // Calculate the center of the object based on its size and canvas size
        const center = calculateCenter(object, this.canvasSize);

        // Set the object's position and coordinates
        object.set({ ...center }).setCoords();
    }

    /**
     * Sets the transform of the specified object relative to the label area.
     * 
     * @param {TransformingObject} to - The object to set the transform for.
     */
    private setObjectTransform(to: TransformingObject): void {
        // Calculate the transform matrix of the label area
        const labelTransform = this.labelArea.calcTransformMatrix();

        // Invert the transform matrix
        const invertedTransform = fabric.util.invertTransform(labelTransform);

        // Calculate the relationship transform matrix
        to.relationship = fabric.util.multiplyTransformMatrices(invertedTransform, to.calcTransformMatrix());
    }

    /**
     * Registers event listeners for the specified object.
     * 
     * @param {fabric.Object} object - The object to register events for.
     */
    private registertObjectEvents(object: fabric.Object): void {
        // Register a modified event listener for the object
        object.on('modified', () => this.setObjectTransform(object as TransformingObject));
    }

    /**
     * Registers event listeners for the canvas.
     */
    protected registerCanvasEvents(): void {
        // Register a resize event listener for the window
        window.addEventListener('resize', () => this.resizeCanvas());
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
     * Styles the canvas.
     */
    protected styleCanvas(): void {
        // Set the background color of the canvas
        this.canvas.backgroundColor = `rgb(209 213 219)`;
    }

    /**
     * Resizes the canvas to fit the viewport.
     */
    protected resizeCanvas(): void {
        // Resize the canvas to fit the viewport
        this.canvas.setDimensions(getViewportSize());

        // Recenter the clip path
        this.centerClip();

        // Relocate objects based on their relationships to the label area
        this.relocateObjects();
    }

    /**
     * Renders the clip path on the canvas.
     */
    protected centerClip(): void {
        const elementSize: Size = { width: 500, height: 250 }; // TODO: Get label size.

        // Set the size and position of the clip path
        this.centerObject(this.labelArea.set({
            ...elementSize,
            absolutePositioned: true
        }));
    }

    /**
     * Adds an object to the canvas and sets it as the active object.
     * 
     * @param {fabric.Object} object - The object to be added to the canvas.
     */
    protected addObject(object: fabric.Object): void {
        // Set the clip path of the object
        object.clipPath = this.labelArea;

        // Center the object
        this.centerObject(object);

        // Set the transform of the object relative to the label area
        this.setObjectTransform(object as TransformingObject);

        // Add the object to the canvas
        this.canvas.add(object);

        // Set the object as the active object
        this.canvas.setActiveObject(object);

        // Register object events
        this.registertObjectEvents(object);
    }

    /**
     * Relocates objects based on their relationships to the label area.
     */
    public relocateObjects() {
        // Get all objects on the canvas excluding the label area
        const objects = this.canvas.getObjects().filter(f => f !== this.labelArea);

        // Relocate each object
        objects.forEach(o => {
            const to = o as TransformingObject;

            if (!to.relationship) return;

            const newTransform = fabric.util.multiplyTransformMatrices(
                this.labelArea.calcTransformMatrix(),
                to.relationship
            );

            const opt = fabric.util.qrDecompose(newTransform);
            const point = new fabric.Point(opt.translateX, opt.translateY);

            o.set({ flipX: false, flipY: false });
            o.setPositionByOrigin(point, 'center', 'center');
            o.set(opt);
            o.setCoords();
        });
    }
}
