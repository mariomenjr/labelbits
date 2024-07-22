import * as fabric from 'fabric';
import { createClipPath, createRectangle, createTextbox } from './utils/default';
import { getViewportSize, Size, calculateCenter } from './utils/elements';

/**
 * The LabelDesigner class is the main class for the label designer.
 * It provides methods to interact with the Fabric.js canvas and the Alpine.js
 * application.
 */
export default class LabelDesigner {

    /**
     * The Fabric.js canvas object.
     */
    public canvas: fabric.Canvas;

    /**
     * The clip path used to restrict the rendering of objects on the canvas.
     */
    public clipPath: fabric.Rect;

    /**
     * Constructs a new LabelDesigner instance.
     */
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
     * Registers event listeners for the canvas.
     */
    private registerEvents(): void {
        // Resize the canvas when the window is resized
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Styles the canvas.
     */
    private styleCanvas(): void {
        this.canvas.backgroundColor = `rgb(209 213 219)`;
    }

    /**
     * Resizes the canvas to fit the viewport.
     */
    private resizeCanvas(): void {
        // Resize canvas
        this.canvas.setDimensions(getViewportSize());

        // Recenter clip path
        this.centerClip();
        // this.canvas.getObjects().forEach((object) => object.setCoords());
    }

    /**
     * Renders the clip path on the canvas.
     */
    private centerClip(): void {
        const elementSize: Size = { width: 500, height: 250 }; // TODO: Get label size.

        this.centerObject(this.clipPath.set({
            ...elementSize,
            absolutePositioned: true
        }));
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
     * Exports the JSON representation of the canvas.
     */
    toJson(): void {
        const json = this.canvas.toJSON();
        console.debug({ json });
    }

    /**
     * Adds a textbox object to the canvas.
     */
    addTextbox(): void {
        this.addObject(createTextbox());
    }

    /**
     * Adds a rectangle object to the canvas.
     */
    addRectangle(): void {
        this.addObject(createRectangle());
    }

    /**
     * Adds an object to the canvas and sets it as the active object.
     * 
     * @param {fabric.Object} object - The object to be added to the canvas.
     */
    addObject(object: fabric.Object): void {
        object.clipPath = this.clipPath;

        this.centerObject(object);

        this.canvas.add(object);
        this.canvas.setActiveObject(object);
    }
}

