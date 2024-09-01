import * as fabric from "fabric";

import Space from "./Space";
import { selectionStyle } from "../../utils/default";
import { TransformingObject } from "../../utils/fabric";

/**
 * The Relationship class represents a space that allows objects to be positioned relative to a label area.
 * It provides methods to add objects to the canvas, relocate objects based on their relationships, and resize the canvas.
 */
export default abstract class Relationship extends Space {
    /**
     * Adds an object to the canvas and sets it as the active object.
     * 
     * @param {fabric.Object} object - The object to be added to the canvas.
     */
    protected addObject(object: fabric.Object): void {
        // Set the selection style of the object
        object.set({ ...selectionStyle });

        // Set the clip path of the object to the label area
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
        this.registerObjectEvents(object);
    }

    /**
     * Relocates objects based on their relationships to the label area.
     */
    protected relocateObjects(): void {
        // Get all objects on the canvas excluding the label area
        const objects = this.canvas.getObjects().filter(f => f !== this.labelArea);

        // Relocate each object
        objects.forEach(o => {
            const to = o as TransformingObject;

            if (to.relationship) {
                // Calculate the new transform matrix of the object based on its relationship
                const newTransform = fabric.util.multiplyTransformMatrices(
                    this.labelArea.calcTransformMatrix(),
                    to.relationship
                );

                // Decompose the new transform matrix into its parts
                const opt = fabric.util.qrDecompose(newTransform);

                // Calculate the new position of the object based on its origin
                const point = new fabric.Point(opt.translateX, opt.translateY);

                // Set the properties of the object based on the new transform matrix
                o.set({ flipX: false, flipY: false });
                o.setPositionByOrigin(point, 'center', 'center');
                o.set(opt);
                o.setCoords();
            }
        });
    }

    /**
     * Registers event listeners for the specified object.
     * 
     * @param {fabric.Object} object - The object to register events for.
     */
    protected registerObjectEvents(object: fabric.Object): void {
        // Register a modified event listener for the object
        object.on('modified', () => this.setObjectTransform(object as TransformingObject));
    }

    /**
     * Overrides the base method to resize the canvas and relocate the objects relative to the label area.
     */
    protected resizeCanvas(): void {
        super.resizeCanvas();

        // Relocate objects based on their relationships to the label area
        this.relocateObjects();
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
}

