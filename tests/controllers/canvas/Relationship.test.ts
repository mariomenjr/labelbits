import * as fabric from "fabric";

import Relationship from "../../../src/controllers/canvas/Relationship";
import { resizeWindow } from "../../window.helper";
import { Position } from "../../../src/utils/elements";
import { TransformingObject } from "../../../src/utils/fabric";

describe("Relationship", () => {
    let space: MockRelationship;

    beforeEach(() => {
        space = new MockRelationship();
    });

    describe("addObject", () => {
        it("should add the object to the canvas and set it as the active object", () => {
            const object = new fabric.Circle({ radius: 10, left: 50, top: 50 });
            space._addObject_(object);
            expect(space._canvas_.getActiveObject()).toBe(object);
            expect(space._canvas_.getObjects().includes(object)).toBe(true);
        });
    });

    describe("relocateObjects", () => {
        it("should relocate objects based on their relationships to the label area", () => {
            const object = new fabric.Rect({ width: 25, height: 25 });

            space._addObject_(object);
            resizeWindow(100); // w: 1124, h: 868
            space._relocateObjects_();

            // Calculate center position manually
            const c: Position = {
                top: (868 / 2) - (25 / 2),
                left: (1124 / 2) - (25 / 2),
            };

            expect(object.left).toBe(c.left);
            expect(object.top).toBe(c.top);
        });
    });

    describe("resizeCanvas", () => {
        it("should resize the canvas and relocate objects relative to the label area", () => {
            const object = new fabric.Rect({ width: 50, height: 50 });

            space._addObject_(object);
            resizeWindow(200); // w: 1324, h: 1068 
            space._resizeCanvas_();

            // Calculate center position manually
            const c: Position = {
                top: (1068 / 2) - (50 / 2),
                left: (1324 / 2) - (50 / 2),
            };

            expect(object.left).toBe(c.left);
            expect(object.top).toBe(c.top);
        });
    });

    describe("setObjectTransform", () => {
        it("should set the transform of the specified object relative to the label area", () => {
            const object = new fabric.Rect({ width: 50, height: 50 }) as fabric.Object;

            space._addObject_(object);

            const labelTransform = space._labelArea_.calcTransformMatrix();
            const invertedTransform = fabric.util.invertTransform(labelTransform);

            const transformingObject = object as TransformingObject;

            transformingObject.relationship = fabric.util.multiplyTransformMatrices(invertedTransform, transformingObject.calcTransformMatrix());

            expect(transformingObject.relationship[0]).toBe(1);
            expect(transformingObject.relationship[1]).toBe(0);
            expect(transformingObject.relationship[2]).toBe(0);
            expect(transformingObject.relationship[3]).toBe(1);
            expect(transformingObject.relationship[4]).toBe(0);
            expect(transformingObject.relationship[5]).toBe(0);
        });
    });

    describe("registerObjectEvents", () => {
        it("should register event listeners for the specified object", () => {
            const object = new fabric.Rect({ width: 50, height: 50 });

            space._addObject_(object);

            object.fire('modified');

            type EventfulObject = object & { __eventListeners: { modified: Array<() => void> } };
            const o = object as unknown as EventfulObject;

            expect(o.__eventListeners.modified[0]).not.toThrow();
            expect(o.__eventListeners.modified[0]).toBeInstanceOf(Function);
        });
    });
});

class MockRelationship extends Relationship {
    get _canvas_(): fabric.Canvas {
        return this.canvas;
    }

    get _labelArea_(): fabric.Rect {
        return this.labelArea;
    }

    public _addObject_(object: fabric.Object): void {
        return this.addObject(object);
    }

    public _relocateObjects_(): void {
        return this.relocateObjects();
    }

    public _resizeCanvas_(): void {
        return this.resizeCanvas();
    }
}
