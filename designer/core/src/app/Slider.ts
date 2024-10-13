import IBridge, { Bridge } from "../bases/IBridge";

/**
 * A slider that can be used to adjust the zoom level of the label designer.
 * 
 * @export
 * @class Slider
 * @implements {IBridge<number>}
 */
export class Slider implements IBridge<number>{
    public max: number = 5;
    public min: number = 0.01;
    public step: number = 0.01;
    public on: ((v: number) => void) | undefined;

    public get ready(): boolean {
        return !!this.on && !!this.getZoom && !!this.setZoom;
    };

    protected getZoom: (() => number) | undefined;
    protected setZoom: ((v: number) => void) | undefined;

    /**
     * The current zoom level of the label designer.
     * 
     * Throws an error if the zoom level has not been initialized.
     * @throws {Error} If `getZoom` is not initialized.
     */
    get value(): number {
        if (!this.ready) throw new Error(`No bridge has been initialized`);
        return this.getZoom!();
    }

    set value(v: number) {
        if (!this.ready) throw new Error(`No bridge has been initialized`);
        this.setZoom!(v);
    }

    /**
     * Binds the slider with the given bridge.
     * The bridge is an object with three properties: `get`, `set`, and `on`.
     * The `get` property is a function that returns the current value of the slider.
     * The `set` property is a function that sets the value of the slider.
     * The `on` property is a function that is called when the value of the slider changes.
     * 
     * @param {Bridge<number>} bridger - The bridge object.
     */
    public bridge(bridger: Bridge<number>): void {
        this.getZoom = bridger.get;
        this.setZoom = bridger.set;
        this.on = bridger.on;
    }
}
