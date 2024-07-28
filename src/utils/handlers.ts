import * as fabric from "fabric";

/**
 * Represents a handler function that takes no arguments and returns no value.
 */
export type VoidHandler = () => void;

/**
 * Represents a handler function that takes a fabric object as an argument and returns no value.
 */
export type FabricObjectHandler = (object: fabric.Object) => void;

