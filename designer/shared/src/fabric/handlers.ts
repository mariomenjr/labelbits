import { GenericAction } from "../main";
import { IPluginObject, SelectionEvent } from "./extended";

/**
 * Represents a handler function that processes a `fabric.Object` and returns no value.
 * 
 * @param {fabric.Object} object - The `fabric.Object` that the handler function processes.
 * @returns {void}
 */
export type PluginObjectAction = GenericAction<IPluginObject>;

/**
 * Represents a handler function for a selection event.
 * 
 * @param {SelectionEvent} selectionEvent - The selection event object that contains information about the event.
 * @returns {void}
 */
export type SelectionEventAction = GenericAction<SelectionEvent>;

/**
 * Represents a callback function that takes a `SelectionEventAction` and returns a value.
 * This function is used to call a handler function with a `SelectionEvent` object.
 * 
 * @param {SelectionEventAction} selectionEventAction - The handler function to call with the `SelectionEvent` object.
 * @returns {void}
 */
export type SelectionEventCallback = GenericAction<SelectionEventAction>;

/**
 * Represents an asynchronous handler function for a plugin object.
 * This function takes an `IPluginObject` and a property name as arguments, and returns a promise that resolves to an `IPluginObject`.
 * 
 * @async
 * @param {IPluginObject} object - The `IPluginObject` that the handler function processes.
 * @param {string} propertyName - The name of the property that the handler function processes.
 * @returns {Promise<IPluginObject>} A promise that resolves to the updated `IPluginObject`.
 */
export type PluginObjectHandlerAsync = (object: IPluginObject, propertyName: string) => Promise<IPluginObject>;