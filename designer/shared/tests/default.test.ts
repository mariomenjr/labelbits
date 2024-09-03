import * as fabric from "fabric";

import { colors, selectionStyle, createClipPath, createRectangle } from "../src/default";

describe("colors", () => {
    it("should have a selectionColor property", () => {
        expect(colors).toHaveProperty("selectionColor");
    });
    it("should have a labelBackground property", () => {
        expect(colors).toHaveProperty("labelBackground");
    });
    it("should have a rectangleBackground property", () => {
        expect(colors).toHaveProperty("rectangleBackground");
    });
});

describe("selectionStyle", () => {
    it("should have a borderColor property", () => {
        expect(selectionStyle).toHaveProperty("borderColor");
    });
    it("should have a cornerColor property", () => {
        expect(selectionStyle).toHaveProperty("cornerColor");
    });
    it("should have a cornerSize property", () => {
        expect(selectionStyle).toHaveProperty("cornerSize");
    });
    it("should have a transparentCorners property", () => {
        expect(selectionStyle).toHaveProperty("transparentCorners");
    });
});

describe("createClipPath", () => {
    it("should return a fabric.Rect object", () => {
        expect(createClipPath()).toBeInstanceOf(fabric.Rect);
    });
    it("should set the fill property", () => {
        expect(createClipPath().fill).toBe(colors.labelBackground);
    });
    it("should set the selectable property to false", () => {
        expect(createClipPath().selectable).toBe(false);
    });
    it("should set the hoverCursor property to default", () => {
        expect(createClipPath().hoverCursor).toBe("default");
    });
});

describe("createRectangle", () => {
    it("should return a fabric.Rect object", () => {
        expect(createRectangle()).toBeInstanceOf(fabric.Rect);
    });
    it("should set the fill property", () => {
        expect(createRectangle().fill).toBe(colors.rectangleBackground);
    });
    it("should set the width property", () => {
        expect(createRectangle().width).toBe(125);
    });
    it("should set the height property", () => {
        expect(createRectangle().height).toBe(125);
    });
});
