import * as fabric from "fabric";

import { colors, createClipPath, createRectangle } from "../../src/fabric";

describe("createClipPath", () => {
    it("should return a fabric.Rect object", () => {
        const clipPath = createClipPath();
        expect(clipPath).toBeInstanceOf(fabric.Rect);
    });

    it("should set the fill property", () => {
        const clipPath = createClipPath();
        expect(clipPath.fill).toBe(colors.labelBackground);
    });

    it("should set the selectable property to false", () => {
        const clipPath = createClipPath();
        expect(clipPath.selectable).toBe(false);
    });

    it("should set the hoverCursor property to default", () => {
        const clipPath = createClipPath();
        expect(clipPath.hoverCursor).toBe("default");
    });
});

describe("createRectangle", () => {
    it("should return a fabric.Rect object", () => {
        const rectangle = createRectangle();
        expect(rectangle).toBeInstanceOf(fabric.Rect);
    });

    it("should set the fill property", () => {
        const rectangle = createRectangle();
        expect(rectangle.fill).toBe(colors.rectangleBackground);
    });

    it("should set the width property", () => {
        const rectangle = createRectangle();
        expect(rectangle.width).toBe(125);
    });

    it("should set the height property", () => {
        const rectangle = createRectangle();
        expect(rectangle.height).toBe(125);
    });
});