import { GenericAction, GenericHandler } from "@labelbits/designer-shared";

/**
 * Represents a bridge setter type.
 * 
 * @export
 * @interface Bridge
 * @template T - The type of the bridge.
 */
export type BridgeSetter<T> = {
    set: GenericAction<T>,
};

/**
 * Represents a bridge getter type.
 * 
 * @export
 * @interface Bridge
 * @template T - The type of the bridge.
 */
export type BridgeGetter<T> = {
    get: GenericHandler<T>,
};

/**
 * Represents a bridge onner type.
 * 
 * @export
 * @interface Bridge
 * @template T - The type of the bridge.
 */
export type BridgeOnner<T> = {
    on: GenericAction<T>
};

/**
 * Represents a bridge type.
 * 
 * @export
 * @interface Bridge
 * @template T - The type of the bridge.
 */
export type Bridge<T> = BridgeGetter<T> & BridgeSetter<T> & BridgeOnner<T>;

/**
 * Represents a bridge interface.
 * 
 * @export
 * @interface IBridge
 * @template T - The type of the bridge.
 */
export default interface IBridge<T> {
    get ready(): boolean;
    bridge(bridger: Bridge<T>): void;
}