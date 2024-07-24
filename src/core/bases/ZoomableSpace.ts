import * as fabric from 'fabric';

import ChildfulSpace from './ChildfulSpace';

/**
 * The DraggableCanvas class is an abstract base class for fabric.Canvas objects
 * that support dragging. It adds properties and methods to track the state of
 * dragging and the last position of the pointer.
 */
abstract class DraggableCanvas extends fabric.Canvas {
    /**
     * Indicates whether a drag operation is currently in progress.
     */
    isDragging: boolean = false;

    /**
     * The x-coordinate of the pointer's last position during a drag operation.
     */
    lastPosX: number = 0;

    /**
     * The y-coordinate of the pointer's last position during a drag operation.
     */
    lastPosY: number = 0;
}

/**
 * Defines a custom pointer event for the canvas.
 */
type CanvasPointerEvent = fabric.TPointerEvent & {
    clientX: number;
    clientY: number;
}

/**
 * The ZoomableSpace class extends the ChildfulSpace class and provides zoom functionality.
 * It allows the user to zoom in and out of the canvas by holding the Ctrl key and scrolling
 * up or down.
 * 
 * It also allows the user to drag the canvas by holding the Ctrl key and clicking and dragging
 * the mouse.
 */
export default abstract class ZoomableSpace extends ChildfulSpace {

    /**
     * Registers canvas events for the ZoomableSpace class.
     * This method overrides the base class method to include scroll and drag events.
     */
    protected registerCanvasEvents(): void {

        super.registerCanvasEvents();
        
        // Register scroll event
        this.registerOnScroll();

        // Register drag event
        this.registerOnDrag();
    }

    /**
     * Registers a scroll event listener for the canvas.
     * This method listens for the 'mouse:wheel' event and zooms the canvas in or out
     * depending on the scroll direction and the Ctrl key being held down.
     */
    private registerOnScroll(): void {
        

        this.canvas.on('mouse:wheel', (opt) => {
            if (!opt.e.ctrlKey) return;

            const zoom = this.calculateZoom(opt.e.deltaY);
            const point = new fabric.Point(opt.e.offsetX, opt.e.offsetY);

            this.setZoom(point, zoom);

            opt.e.preventDefault();
            opt.e.stopPropagation();

            this.canvas.requestRenderAll();
        });
    }

    /**
     * Registers a drag event listener for the canvas.
     * This method listens for the 'mouse:down', 'mouse:move', and 'mouse:up' events
     * and allows the user to drag the canvas by holding the Ctrl key and clicking and dragging
     * the mouse.
     */
    private registerOnDrag(): void {
        const draggableCanvas = this.canvas as DraggableCanvas;

        draggableCanvas.on('mouse:down', (opt) => {
            const evt = opt.e as CanvasPointerEvent;
            if (evt.ctrlKey === true) {
                draggableCanvas.isDragging = true;
                draggableCanvas.selection = false;
                draggableCanvas.lastPosX = evt.clientX;
                draggableCanvas.lastPosY = evt.clientY;
            }
        });
        draggableCanvas.on('mouse:move', (opt) => {
            if (draggableCanvas.isDragging) {
                const e = opt.e as CanvasPointerEvent;
                const vpt = draggableCanvas.viewportTransform;

                vpt[4] += e.clientX - draggableCanvas.lastPosX;
                vpt[5] += e.clientY - draggableCanvas.lastPosY;
                draggableCanvas.requestRenderAll();
                draggableCanvas.lastPosX = e.clientX;
                draggableCanvas.lastPosY = e.clientY;
            }
        });
        draggableCanvas.on('mouse:up', (opt) => {
            // // on mouse up we want to recalculate new interaction
            // // for all objects, so we call setViewportTransform
            draggableCanvas.setViewportTransform(draggableCanvas.viewportTransform);
            draggableCanvas.isDragging = false;
            draggableCanvas.selection = true;
        });
    }

    /**
     * Calculates the zoom factor based on the scroll direction and the Ctrl key being held down.
     * @param delta - The scroll direction.
     * @returns The zoom factor.
     */
    protected calculateZoom(delta: number): number {
        const zoom = this.canvas.getZoom() * (1 - 0.001 * delta);
        return Math.max(0.01, Math.min(20, zoom));
    }

    /**
     * Sets the zoom point and zoom factor for the canvas.
     * @param point - The point to zoom to.
     * @param zoom - The zoom factor.
     */
    protected setZoom(point: fabric.Point, zoom: number): void {
        this.canvas.zoomToPoint(point, zoom);
    }
}
