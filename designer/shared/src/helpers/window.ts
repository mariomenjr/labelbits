/**
 * Resizes the window by modifying the `innerWidth` and `innerHeight` properties of the `window` object.
 * This function adjusts the size of the window and dispatches a resize event to notify other parts of the application
 * about the change.
 * 
 * @param {number} diff - The amount to adjust both the width and height of the window by. Positive values will increase
 *                        the dimensions, while negative values will decrease them.
 * @returns {void} This function does not return anything.
 */
export function resizeWindow(diff: number): void {
    // Define a new value for the innerWidth property
    Object.defineProperty(window, `innerWidth`, {
        writable: true,
        configurable: true,
        value: window.innerWidth + diff,
    });

    // Define a new value for the innerHeight property
    Object.defineProperty(window, `innerHeight`, {
        writable: true,
        configurable: true,
        value: window.innerHeight + diff,
    });

    // Dispatch a resize event to notify the application of the change
    window.dispatchEvent(new Event(`resize`));
}
