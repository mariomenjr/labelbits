/**
 * Represents a handler function that takes no arguments and returns no value.
 * 
 * @typedef {Function} VoidHandler
 * @returns {void} This function does not return anything.
 */
export type VoidHandler = () => void;

/**
 * Represents a handler function that takes no arguments and returns a promise that resolves to void.
 * 
 * @typedef {Function} VoidHandlerAsync
 * @returns {Promise<void>} A promise that resolves to void when the asynchronous operation is complete.
 */
export type VoidHandlerAsync = () => Promise<void>;

/**
 * Represents a handler function that takes a value of type T and returns no value.
 * 
 * @template T - The type of the handler function.
 * @typedef {Function} GenericHandler
 * @param {T} value - The value that the handler function processes.
 * @returns {void} This function does not return anything.
 */
export type GenericHandler<T> = () => T;

/**
 * Represents a handler function that takes a value of type T and returns a promise that resolves to void.
 * 
 * @template T - The type of the handler function.
 * @typedef {Function} GenericAction
 * @param {T} value - The value that the handler function processes.
 * @returns {void} This function does not return anything.
 */
export type GenericAction<T> = (value: T) => void;