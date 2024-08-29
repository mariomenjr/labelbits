import * as fabric from "fabric";

import FabricObjectPlugin from "../controllers/plugins/FabricObjectPlugin";

/**
 * TextboxPlugin class represents a plugin for creating textbox objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync method.
 */
export default class TextboxPlugin extends FabricObjectPlugin {
    updateObjectAsync(_: fabric.FabricObject): Promise<void> {
        throw new Error("Method not implemented.");
    }
    /**
     * Creates a new textbox object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        return new fabric.Textbox(`New text`, {
            /**
             * The width of the textbox.
             */
            width: 150,
            /**
             * The font size of the textbox.
             */
            fontSize: 16,
        });
    }
}
