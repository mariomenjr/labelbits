/**
 * The Collection class is an abstract base class that represents a collection of items.
 * It extends the built-in Array class and provides a way to access and manipulate the items.
 *
 * @template T - The type of items in the collection.
 */
export default abstract class Collection<T> extends Array<T> {
    /**
     * Gets the items in the collection as an array.
     *
     * @returns {T[]} - The items in the collection.
     */
    get items(): T[] {
        // Return a new array containing all the items in the collection.
        // The spread operator is used to create a shallow copy of the array.
        return [...this];
    }
}
