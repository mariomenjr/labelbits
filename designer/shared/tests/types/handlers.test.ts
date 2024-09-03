import * as fabric from "fabric";

import { VoidHandler, VoidHandlerAsync, FabricObjectHandler, SelectionEvent, FabricSelectionEventHandler, FabricSelectionEventCallback } from "../../src/types/handlers";

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

describe("FabricObjectHandler", () => {
    it("should call the handler function with the object", () => {
        const handle = jest.fn();
        const object = new fabric.Text("Hello");
        const handler: FabricObjectHandler = handle;
        handler(object);
        expect(handle).toHaveBeenCalledWith(object);
    });
});

describe("SelectionEvent", () => {
    it("should be a partial of the fabric.TEvent<fabric.TPointerEvent> interface", () => {
        const event = { selected: [], deselected: [] } as SelectionEvent;

        expect(event).toBeDefined();
        expect(event).toHaveProperty("selected");
        expect(event).toHaveProperty("deselected");
    });
});

describe("FabricSelectionEventHandler", () => {
    it("should not throw an error when called with a selection event", () => {
        const handler: FabricSelectionEventHandler = (se: SelectionEvent) => se.selected.length;
        const obj = new fabric.Object();
        const event = {
            selected: [obj],
            deselected: []
        };
        expect(() => handler(event)).not.toThrow();
    });

    it("should throw an error when called with a non-selection event", () => {
        const handler: FabricSelectionEventHandler = (se: SelectionEvent) => se.selected.length;
        const event = { foo: "bar" } as unknown as SelectionEvent;
        expect(() => handler(event)).toThrow();
    });
});

describe("FabricSelectionEventCallback", () => {
    it("should not throw an error when called with a selection event handler", () => {
        const callback = ((seh: FabricSelectionEventHandler) => seh({ selected: [], deselected: [] })) as FabricSelectionEventCallback;
        const handler = ((se: SelectionEvent) => se.selected.length) as FabricSelectionEventHandler;

        expect(() => callback(handler)).not.toThrow();
    });

    it("should throw an error when called with a non-selection event handler", () => {
        const callback: FabricSelectionEventCallback = (seh: FabricSelectionEventHandler) => seh.arguments[0].selected.length;
        const handler = () => { };
        expect(() => callback(handler)).toThrow();
    });
});