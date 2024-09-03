import * as fabric from "fabric";

import { calculateCenter, getViewportSize } from "../../src/utils/elements";

describe("calculateCenter", () => {
    it("should calculate the center point of a rectangle", () => {
        const rect = new fabric.Rect({ width: 10, height: 10 });
        const size = { width: 100, height: 100 };

        const center = calculateCenter(rect, size);

        expect(center.left).toBe(45);
        expect(center.top).toBe(45);
    });
});


describe("getViewportSize", () => {
    /**
     * @jest-environment jsdom
     */
    it("should return the size of the viewport", () => {
        const size = getViewportSize();

        expect(size.width).toBe(window.innerWidth);
        expect(size.height).toBe(window.innerHeight);
    });
});
