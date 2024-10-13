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

export type GenericHandler<T> = () => T;