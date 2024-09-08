/**
 * Resizes the window by modifying the innerWidth and innerHeight properties of the window object.
 *
 * @param {number} diff - The amount to adjust the width and height by.
 * @return {void} This function does not return anything.
 */
export function resizeWindow(diff: number): void {

    Object.defineProperty(window, `innerWidth`, {
        writable: true,
        configurable: true,
        value: window.innerWidth + diff,
    });

    Object.defineProperty(window, `innerHeight`, {
        writable: true,
        configurable: true,
        value: window.innerHeight + diff,
    });

    window.dispatchEvent(new Event(`resize`));
}