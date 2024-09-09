import * as fabric from "fabric";
import { SelectionEvent } from "./extended";

/**
 * Represents a handler function that processes a `fabric.Object` and returns no value.
 * 
 * @param {fabric.Object} object - The `fabric.Object` that the handler function processes.
 * @returns {void}
 */
export type FabricObjectHandler = (object: fabric.Object) => void;

/**
 * Represents a handler function for a selection event.
 * 
 * @param {SelectionEvent} selectionEvent - The selection event object that contains information about the event.
 * @returns {void}
 */
export type FabricSelectionEventHandler = (selectionEvent: SelectionEvent) => void;

/**
 * Represents a callback function that takes a `FabricSelectionEventHandler` as an argument and returns void.
 * This type is used to pass a fabric selection event handler to other functions or components.
 * 
 * @param {FabricSelectionEventHandler} selectionEventHandler - The fabric selection event handler function.
 * @returns {void}
 */
export type FabricSelectionEventCallback = (selectionEventHandler: FabricSelectionEventHandler) => void;

/**
 * Represents an asynchronous function that processes a `fabric.Object` based on a given property name.
 * 
 * @param {fabric.Object} object - The `fabric.Object` to process.
 * @param {string} propertyName - The property name used to process the object.
 * @returns {Promise<fabric.Object>} A promise that resolves to the processed `fabric.Object`.
 */
export type FabricObjectProcessorAsync = (object: fabric.Object, propertyName: string) => Promise<fabric.Object>;
