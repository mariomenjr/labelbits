import * as fabric from "fabric";

import ObjectsLayer from "./ObjectsLayer";

/** 
 * The InteractiveCanvas class extends the ObjectsLayer class
 * and provides additional methods for handling mouse events.
 * 
 * @abstract
 * @extends ObjectsLayer
*/
export default abstract class InteractiveCanvas extends ObjectsLayer {
    /**
     * Indicates whether a drag operation is currently in progress.
     * @type {boolean}
     */
    public isDragging: boolean = false;

    /**
     * The x-coordinate of the pointer's last position during a drag operation.
     * @type {number}
     */
    public lastPosX: number = 0;

    /**
     * The y-coordinate of the pointer's last position during a drag operation.
     * @type {number}
     */
    public lastPosY: number = 0;

    /**
     * Registers canvas events for the InteractiveCanvas class.
     * This method overrides the base class method to include scroll and drag events.
     * 
     * @protected
     * @override
     */
    protected registerEvents(): void {
        super.registerEvents();

        this._registerOnDrag();
        this._registerOnScroll();
    }

    /**
     * Registers a mouse:wheel event handler to zoom the canvas.
     * When the user scrolls the mouse wheel while holding the Ctrl key,
     * the canvas is zoomed in or out.
     * 
     * @private
     */
    private _registerOnScroll(): void {
        this.on('mouse:wheel', (opt) => {
            if (!opt.e.ctrlKey) return;

            const zoom = this.computeZoom(opt.e.deltaY);
            const point = new fabric.Point(opt.e.offsetX, opt.e.offsetY);

            this.zoomToPoint(point, zoom);

            opt.e.preventDefault();
            opt.e.stopPropagation();

            this.requestRenderAll();
        });
    }


    /**
     * Registers a mouse:down event handler to enable dragging of the canvas.
     * If the user holds the Ctrl key and clicks, the canvas is set to a dragging mode.
     * In this mode, moving the mouse will pan the canvas.
     * Clicking again will exit the dragging mode and re-enable object selection.
     * 
     * @private
     */
    private _registerOnDrag(): void {
        this.on('mouse:down', (opt) => {
            // const evt = opt.e as CanvasPointerEvent;
            if (opt.e.ctrlKey === true) {

                this.isDragging = true;
                this.selection = false;

                this.lastPosX = opt.viewportPoint.x;
                this.lastPosY = opt.viewportPoint.y;
                // this.lastPosX = evt.clientX;
                // this.lastPosY = evt.clientY;
            }
        });

        this.on('mouse:move', (opt) => {
            if (this.isDragging) {
                const vpt = this.viewportTransform;

                vpt[4] += opt.viewportPoint.x - this.lastPosX;
                vpt[5] += opt.viewportPoint.y - this.lastPosY;

                this.requestRenderAll();

                this.lastPosX = opt.viewportPoint.x;
                this.lastPosY = opt.viewportPoint.y;
            }
        });

        this.on('mouse:up', (_) => {
            this.setViewportTransform(this.viewportTransform);
            this.isDragging = false;
            this.selection = true;
        });
    }

    /**
     * Computes the new zoom level for the canvas based on a scroll delta.
     * 
     * The zoom level is calculated by multiplying the current zoom level by a factor
     * dependent on the sign of the delta. The factor is 1 - 0.001 * delta, which means
     * that scrolling up (negative delta) will increase the zoom level and scrolling down
     * (positive delta) will decrease the zoom level.
     * 
     * The computed zoom level is then clamped to the range [0.01, 20] to prevent it from
     * getting too large or too small.
     * 
     * @param {number} delta - The scroll delta.
     * @returns {number} The new zoom level.
     */
    protected computeZoom(delta: number): number {
        const zoom = this.getZoom() * (1 - 0.001 * delta);
        return Math.max(0.01, Math.min(20, zoom));
    }
}
