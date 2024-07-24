import * as fabric from 'fabric';

import Space from "./Space";

abstract class DraggableCanvas extends fabric.Canvas {
    isDragging: boolean = false;
    lastPosX: number = 0;
    lastPosY: number = 0;
}

type CanvasPointerEvent = fabric.TPointerEvent & {
    clientX: number;
    clientY: number;
}

export default abstract class ZoomableSpace extends Space {

    /**
     * Registers event listeners for the canvas.
     */
    protected registerEvents(): void {

        super.registerEvents();
        
        this.registerOnScroll();
        this.registerOnDrag();
    }

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

    protected calculateZoom(delta: number): number {
        const zoom = this.canvas.getZoom() * (1 - 0.001 * delta);
        return Math.max(0.01, Math.min(20, zoom));
    }

    protected setZoom(point: fabric.Point, zoom: number): void {
        this.canvas.zoomToPoint(point, zoom);
    }
}