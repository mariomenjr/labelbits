import Options from "../models/Options";
import LabelDesigner from "../core/LabelDesigner";
import Designee from "../models/Designee";
import Element from "../models/Element";

/**
 * Represents a click handler function for a toolbox button.
 */
type EventHandler = () => void;

/**
 * Represents a control button that can be used in the toolbox.
 */
interface Tool extends Element {
    /**
     * The icon class name associated with the button.
     */
    icon: string;
    /**
     * The click handler function for the button.
     */
    onClick: EventHandler;
}

/**
 * Creates a new ToolboxButton instance.
 *
 * @param {string} name - The name of the control. This is used to generate the id and icon class names.
 * @param {() => void} [onClick] - The click handler function for the control. If not provided, a default error message will be logged.
 *
 * @return {Tool} The newly created ToolboxButton instance.
 */
export function createToolboxButton(name: string, onClick: EventHandler): Tool {
    return {
        id: `btn-${name}`,
        icon: `icon-${name}`,
        onClick: onClick
    };
}

/**
 * Represents the toolbox that contains control buttons for interacting with the label designer.
 */
export default class Toolbox extends Designee implements Options<Tool> {

    /**
     * The array of control buttons in the toolbox.
     */
    public controls: Tool[];

    /**
     * Constructs a new Toolbox instance.
     *
     * @param {LabelDesigner} designer - The label designer instance that the toolbox is associated with.
     */
    constructor(designer: LabelDesigner) {
        super(designer);

        // Initialize the controls array with default settings
        this.controls = [
            {
                label: `text-plus`,
                onClick: () => this.designer.addTextbox(), // Adds a new textbox object to the canvas
            },
            {
                label: `rectangle-plus`,
                onClick: () => this.designer.addRectangle(), // Adds a new rectangle object to the canvas
            },
            {
                label: `export-json`,
                onClick: () => this.designer.toJson(), // Exports the JSON representation of the canvas
            },
        ].map((ctrl) => createToolboxButton(ctrl.label, ctrl.onClick));

        console.log(`Toolbox started.`);
    }
}
