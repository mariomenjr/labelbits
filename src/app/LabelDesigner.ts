
import ZoomableSpace from '../bases/ZoomableSpace';
import { createBarcodeAsync, createQrcodeAsync, createRectangle, createTextbox } from '../utils/default';

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
     * Adds a barcode object to the canvas asynchronously.
     *
     * @return {Promise<void>} A promise that resolves when the barcode is added.
     */
    async addBarcodeAsync(): Promise<void> {
        this.addObject(await createBarcodeAsync());
    }

    async addQrcodeAsync(): Promise<void> {
        this.addObject(await createQrcodeAsync());
    }
}

