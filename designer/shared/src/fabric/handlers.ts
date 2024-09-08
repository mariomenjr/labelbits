import * as fabric from "fabric";
import { SelectionEvent } from "./extended";

/**
 * Represents a handler function that takes a fabric object as an argument and returns no value.
 * 
 * @param {fabric.Object} object - The fabric object that the handler function takes as an argument.
 */
export type FabricObjectHandler = (object: fabric.Object) => void;

/**
 * Represents a handler function for the selection event.
 * 
 * @param {SelectionEvent} selectionEvent - The selection event object that contains information about the event.
 */
export type FabricSelectionEventHandler = (selectionEvent: SelectionEvent) => void;

/**
 * Represents a callback function that takes a fabric selection event handler as an argument and returns void.
 * This type is used to pass the fabric selection event handler to other functions or components.
 * 
 * @param {FabricSelectionEventHandler} selectionEventHandler - The fabric selection event handler function.
 * @returns {void}
 */
export type FabricSelectionEventCallback = (selectionEventHandler: FabricSelectionEventHandler) => void;

export type FabricObjectProcessorAsync = (object: fabric.Object) => Promise<fabric.Object>;
