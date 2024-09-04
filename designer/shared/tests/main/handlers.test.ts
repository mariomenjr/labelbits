import { VoidHandler, VoidHandlerAsync } from "../../src/main/handlers";

describe("VoidHandler", () => {
    it("should not throw an error when called", () => {
        const handler: VoidHandler = () => { };
        expect(() => handler()).not.toThrow();
    });
});

describe("VoidHandlerAsync", () => {
    it("should return a resolved promise when called", async () => {
        const handler: VoidHandlerAsync = () => Promise.resolve();
        await expect(handler()).resolves.toBeUndefined();
    });
});
