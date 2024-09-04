import { colors, selectionStyle } from "../../src/fabric";

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
