import * as fabric from 'fabric';
import { createRectangle, createTextbox } from './utils/default';

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
     * Constructs a new LabelDesigner instance.
     */
    constructor() {
        this.canvas = new fabric.Canvas(`canvas`);

        this.styleCanvas();
        this.resizeCanvas();

        this.canvas.renderAll();

        // Resize canvas on window resize
        window.addEventListener('resize', () => this.resizeCanvas());

        console.log(`Canvas started.`);
    }

    private styleCanvas() {
        this.canvas.backgroundColor = `white`;
    }

    private resizeCanvas() {
        this.canvas.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
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
     * @param {fabric.Object} - The object to be added to the canvas.
     */
    addObject(object: fabric.Object): void {
        this.canvas.add(object);
        this.canvas.setActiveObject(object);
    }
}

