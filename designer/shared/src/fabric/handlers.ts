import { IPluginObject, SelectionEvent } from "./extended";

/**
 * Represents a handler function that processes a `fabric.Object` and returns no value.
 * 
 * @param {fabric.Object} object - The `fabric.Object` that the handler function processes.
 * @returns {void}
 */
export type PluginObjectAction = (object: IPluginObject) => void;

/**
 * Represents a handler function for a selection event.
 * 
 * @param {SelectionEvent} selectionEvent - The selection event object that contains information about the event.
 * @returns {void}
 */
export type FabricSelectionEventAction = (selectionEvent: SelectionEvent) => void;

/**
 * Represents a callback function that takes a `FabricSelectionEventHandler` as an argument and returns void.
 * This type is used to pass a fabric selection event handler to other functions or components.
 * 
 * @param {FabricSelectionEventAction} selectionEventHandler - The fabric selection event handler function.
 * @returns {void}
 */
export type FabricSelectionEventCallback = (selectionEventHandler: FabricSelectionEventAction) => void;

export type PluginObjectHandlerAsync = (object: IPluginObject, propertyName: string) => Promise<IPluginObject>;
