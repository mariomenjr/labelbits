import * as fabric from "fabric";
import BaseCanvas from "./BaseCanvas";
import { selectionStyle, TransformingObject } from "@labelbits/designer-shared/fabric";

/**
 * The ObjectsLayer class represents a space that allows objects to be positioned relative to a label area.
 * It provides methods to add objects to the canvas, relocate objects based on their relationships, and resize the canvas.
 * 
 * @abstract
 * @extends BaseCanvas
 */
export default abstract class ObjectsLayer extends BaseCanvas {
    /**
     * Adds an object to the canvas and sets it as the active object.
     * 
     * @protected
     * @param {fabric.Object} object - The object to be added to the canvas.
     */
    protected addObject(object: fabric.Object): void {
        object.set({ ...selectionStyle });
        object.clipPath = this.labelArea;

        this.centerObject(object);
        this.setObjectTransform(object as TransformingObject);

        this.canvas.add(object);
        this.canvas.setActiveObject(object);

        this.registerObjectEvents(object);
    }

    /**
     * Relocates objects on the canvas based on their relationships to the label area.
     * Ensures that all objects maintain their relative positions after transformations.
     * 
     * @protected
     */
    protected relocateObjects(): void {
        const objects = this.canvas.getObjects().filter(f => f !== this.labelArea);

        objects.forEach(o => {
            const to = o as TransformingObject;

            if (to.relationship) {
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
            }
        });
    }

    /**
     * Registers event listeners for the specified object.
     * Ensures that the object is updated correctly after any modifications.
     * 
     * @protected
     * @param {fabric.Object} object - The object to register events for.
     */
    protected registerObjectEvents(object: fabric.Object): void {
        object.on('modified', () => this.setObjectTransform(object as TransformingObject));
    }

    /**
     * Overrides the base method to resize the canvas and relocate the objects relative to the label area.
     * 
     * @protected
     * @override
     */
    protected resizeCanvas(): void {
        super.resizeCanvas();
        this.relocateObjects();
    }

    /**
     * Sets the transform of the specified object relative to the label area.
     * This method calculates the object's transform matrix based on its relationship to the label area.
     * 
     * @private
     * @param {TransformingObject} to - The object for which the transform will be set.
     */
    private setObjectTransform(to: TransformingObject): void {
        const labelTransform = this.labelArea.calcTransformMatrix();
        const invertedTransform = fabric.util.invertTransform(labelTransform);
        
        to.relationship = fabric.util.multiplyTransformMatrices(invertedTransform, to.calcTransformMatrix());
    }
}
