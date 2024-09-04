import * as fabric from "fabric";

import { getViewportSize, calculateCenter, Size } from "../../src/fabric";

describe("getViewportSize", () => {
  it("should return the size of the viewport", () => {
    const size = getViewportSize();
    expect(size.width).toBe(window.innerWidth);
    expect(size.height).toBe(window.innerHeight);
  });
});

describe("calculateCenter", () => {
  it("should calculate the center position of an object", () => {
    const object = new fabric.Rect({ width: 100, height: 100 });
    const referenceSize: Size = { width: 200, height: 200 };
    const center = calculateCenter(object, referenceSize);
    expect(center.left).toBe(50);
    expect(center.top).toBe(50);
  });

  it("should handle object with different size", () => {
    const object = new fabric.Rect({ width: 50, height: 50 });
    const referenceSize: Size = { width: 200, height: 200 };
    const center = calculateCenter(object, referenceSize);
    expect(center.left).toBe(75);
    expect(center.top).toBe(75);
  });

  it("should handle reference size with different dimensions", () => {
    const object = new fabric.Rect({ width: 100, height: 100 });
    const referenceSize: Size = { width: 300, height: 400 };
    const center = calculateCenter(object, referenceSize);
    expect(center.left).toBe(100);
    expect(center.top).toBe(150);
  });
});