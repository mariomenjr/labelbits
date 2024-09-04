/**
 * Represents a handler function that takes no arguments and returns no value.
 */
export type VoidHandler = () => void;

/**
 * Represents a handler function that takes no arguments and returns a promise that resolves to void.
 */
export type VoidHandlerAsync = () => Promise<void>;
