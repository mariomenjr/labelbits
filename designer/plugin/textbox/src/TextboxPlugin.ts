import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

/**
 * TextboxPlugin class represents a plugin for creating textbox objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync method.
 */
export default class TextboxPlugin extends FabricObjectPlugin {

    protected defaultValue: string = `New text`;

    updateObjectAsync(_: fabric.FabricObject): Promise<fabric.Object> {
        throw new Error("Method not implemented.");
    }
    /**
     * Creates a new textbox object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    async createObjectAsync(): Promise<fabric.Object> {
        return new fabric.Textbox(this.defaultValue, {
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
