import * as fabric from "fabric";

import { FabricObjectPlugin } from "@labelbits/designer-core/plugin";

/**
 * TextboxPlugin class represents a plugin for creating textbox objects in the Fabric.js library.
 * It extends the FabricObjectPlugin class and provides an implementation for the createObjectAsync method.
 * When the plugin is used in the label designer, it will create a new textbox object with the default value
 * when the user clicks on the button in the toolbox.
 */
export default class TextboxPlugin extends FabricObjectPlugin {

    protected defaultValue: string = `New text`;

    /**
     * Updates an existing textbox object asynchronously.
     * This method is called when the content of the textbox is changed.
     * It updates the object by setting the new value of the textbox.
     * @param object The object to update.
     * @returns A promise that resolves to the updated object.
     */
    updateObjectAsync(_: fabric.FabricObject): Promise<fabric.Object> {
        throw new Error("Method not implemented.");
    }
    /**
     * Creates a new textbox object asynchronously.
     * The object is created with the default value of the plugin.
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

