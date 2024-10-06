import * as fabric from "fabric";
import { IPluginObject, selectionStyle } from "@labelbits/designer-shared/fabric";

import BaseCanvas from "./BaseCanvas";

/**
 * The ObjectsLayer class represents a space that allows objects to be positioned relative to a label area.
 * It provides methods to add objects to the canvas, relocate objects based on their relationships, and resize the canvas.
 * 
 * @abstract
 * @extends BaseCanvas
 */
export default abstract class ObjectsLayer extends BaseCanvas {

    /**
     * Adds one or more objects to the canvas and centers them relative to the label area.
     * Sets the selection style for the objects and registers event listeners to update the objects when modified.
     * Sets the last object in the list as the active object.
     * 
     * @param {...IPluginObject[]} objects - The objects to add to the canvas.
     * @returns {number} The number of objects added to the canvas.
     */
    public add(...objects: IPluginObject[]): number {
        const n = super.add(...objects);

        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];

            object.set({ ...selectionStyle });

            this.centerObject(object);
            this._updateRelationship(object);
            this.attachEvents(object);

            this.setActiveObject(object);
        }
        return n;
    }

    /**
     * Relocates objects on the canvas based on their relationships to the label area.
     * Ensures that all objects maintain their relative positions after transformations.
     * 
     * @protected
     */
    protected preserveLayout(): void {
        const objects = this.getObjects().filter(f => f !== this.labelArea);

        objects.forEach(o => {
            const to = o as IPluginObject;

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
     * @param {IPluginObject} object - The object to register events for.
     */
    protected attachEvents(object: IPluginObject): void {
        object.on('modified', (_) => this._updateRelationship(object));
    }

    /**
     * Overrides the base method to resize the canvas and relocate the objects relative to the label area.
     * 
     * @protected
     * @override
     */
    protected matchViewport(): void {
        super.matchViewport();
        this.preserveLayout();
    }

    /**
     * Updates the relationship transform matrix of the specified object.
     * The relationship transform matrix describes the relationship of the object to the label area.
     * It is used to maintain the relative positions of all objects after transformations.
     * 
     * @private
     * @param {IPluginObject} object - The object to update the relationship of.
     */
    private _updateRelationship(object: IPluginObject): void {
        const labelTransform = this.labelArea.calcTransformMatrix();
        const invertedTransform = fabric.util.invertTransform(labelTransform);

        object.relationship = fabric.util.multiplyTransformMatrices(invertedTransform, object.calcTransformMatrix());
    }
}
