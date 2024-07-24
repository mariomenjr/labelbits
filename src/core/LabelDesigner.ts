import * as fabric from 'fabric';

import ZoomableSpace from './bases/ZoomableSpace';
import { createRectangle, createTextbox } from './utils/default';

/**
 * The LabelDesigner class is the main class for the label designer.
 * It provides methods to interact with the Fabric.js canvas and the Alpine.js
 * application.
 */
export default class LabelDesigner extends ZoomableSpace {
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

