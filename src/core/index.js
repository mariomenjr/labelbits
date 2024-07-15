import * as fabric from 'fabric';
import { createRectangle, createTextbox } from './utils/default';

/**
 * Constructor function for the LabelDesigner class.
 *
 * @constructor
 */
function LabelDesigner() {
    /**
     * Start the LabelDesigner.
     * This initializes the canvas and sets the background color to white.
     */
    this.canvas = new fabric.Canvas(`canvas`);
    this.canvas.backgroundColor = `white`;
    this.canvas.renderAll();

    console.log(`Canvas started.`);
}

/**
 * Export the canvas as JSON.
 * The JSON object contains information about the objects in the canvas.
 */
LabelDesigner.prototype.toJson = function () {
    const json = this.canvas.toJSON();
    console.debug({ json });
}

/**
 * Add a textbox to the canvas.
 * The textbox is created using the createTextbox function from the utils/default module.
 */
LabelDesigner.prototype.addTextbox = function () {
    this.addObject(createTextbox());
}

/**
 * Add a rectangle to the canvas.
 * The rectangle is created using the createRectangle function from the utils/default module.
 */
LabelDesigner.prototype.addRectangle = function () {
    this.addObject(createRectangle());
}

/**
 * Add an object to the canvas.
 * The object is added to the canvas and set as the active object.
 *
 * @param {fabric.Object} object - The object to be added to the canvas.
 */
LabelDesigner.prototype.addObject = function (object) {
    this.canvas.add(object);
    this.canvas.setActiveObject(object);
}

export default LabelDesigner;
