import * as fabric from "fabric";
import { SelectionEventAction, SelectionEventCallback } from "@labelbits/designer-shared/fabric";

import ObjectsLayer from "./ObjectsLayer";
import { Slider } from "../app/Slider";

/** 
 * The InteractiveCanvas class extends the ObjectsLayer class
 * and provides additional methods for handling mouse events.
 * 
 * @abstract
 * @extends ObjectsLayer
*/
export default abstract class InteractiveCanvas extends ObjectsLayer {

    public readonly slider: Slider = new Slider();

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
     * Attaches event listeners to the canvas for selection events.
     * The selection events are used to update the settings of the label designer.
     * 
     * @param {SelectionEventCallback} selectionAction - The callback function to be called when a selection event occurs.
     * @returns {void}
     * @see SelectionEventCallback
     */
    public readonly selectionHandler: SelectionEventCallback = (selectionAction: SelectionEventAction): void => {
        /**
         * Attaches event listeners to the canvas for selection events.
         * The selection events are used to update the settings of the label designer.
         */
        this.on("selection:created", selectionAction);
        this.on("selection:updated", selectionAction);
        this.on("selection:cleared", selectionAction);

        console.debug(`Selection event listener attached.`);
    };

    /**
     * Registers canvas events for the InteractiveCanvas class.
     * This method overrides the base class method to include scroll and drag events.
     * 
     * @protected
     * @override
     */
    protected registerEvents(): void {
        super.registerEvents();

        this.registerOnDrag();
        this.registerOnScroll();
    }

    /**
     * Registers an event listener for the 'mouse:wheel' event.
     * If the CTRL key is pressed, the canvas is zoomed in or out based on the wheel delta.
     * The zoom operation is centered at the mouse position.
     * 
     * @protected
     */
    protected registerOnScroll(): void {
        this.on('mouse:wheel', (opt) => {
            if (!opt.e.ctrlKey) return;

            const zoom = this.computeZoom(opt.e.deltaY);
            const point = new fabric.Point(opt.e.offsetX, opt.e.offsetY);

            this.zoomToPoint(point, zoom);
            this.slider.on?.(zoom);

            opt.e.preventDefault();
            opt.e.stopPropagation();

            this.requestRenderAll();
        });
    }

    /**
     * Registers an event listener for the 'mouse:down', 'mouse:move' and 'mouse:up' events.
     * If the CTRL key is pressed, the canvas is dragged horizontally and vertically.
     * The dragging operation is centered at the mouse position.
     * 
     * @protected
     */
    protected registerOnDrag(): void {
        this.on('mouse:down', (opt) => {
            if (opt.e.ctrlKey === true) {

                this.isDragging = true;
                this.selection = false;

                this.lastPosX = opt.viewportPoint.x;
                this.lastPosY = opt.viewportPoint.y;
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

    /**
     * Zooms the canvas to the given zoom level centered at the current canvas center.
     * 
     * @param {number} value - The new zoom level.
     */
    public zoomToCenter(value: number): void {
        this.zoomToPoint(this.getCenterPoint(), value);
    }
}
