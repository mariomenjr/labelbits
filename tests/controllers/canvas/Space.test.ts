import * as fabric from "fabric";

import Space from "../../../src/controllers/canvas/Space";
import { Size } from "../../../src/utils/elements";

describe("Space", () => {
    let space: MockSpace;

    beforeEach(() => {
        space = new MockSpace();
    });

    describe("constructor", () => {
        it("should create a new canvas", () => {
            expect(space._canvas_).toBeInstanceOf(fabric.Canvas);
        });

        it("should create a new clip path", () => {
            expect(space._labelArea_).toBeInstanceOf(fabric.Rect);
        });
    });

    describe("resizeCanvas", () => {
        it("should resize the canvas to fit the viewport", () => {
            const oldWidth = space._canvas_.getWidth();
            const oldHeight = space._canvas_.getHeight();

            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: oldWidth + 50,
            });

            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: oldHeight + 50,
            });

            window.dispatchEvent(new Event('resize'));

            space._resizeCanvas_();

            expect(space._canvas_.getWidth()).toBeGreaterThan(oldWidth);
            expect(space._canvas_.getHeight()).toBeGreaterThan(oldHeight);
        });
    });

    describe("canvasSize", () => {
        it("should return the size of the canvas", () => {
            const size = space._canvasSize_;

            expect(size.width).toBeGreaterThan(0);
            expect(size.height).toBeGreaterThan(0);
        });
    });
});

class MockSpace extends Space {
    public _resizeCanvas_(): void {
        return this.resizeCanvas();
    }

    get _canvas_(): fabric.Canvas {
        return this.canvas;
    }

    get _labelArea_(): fabric.Rect {
        return this.labelArea;
    }

    get _canvasSize_(): Size {
        return this.canvasSize;
    }
}
