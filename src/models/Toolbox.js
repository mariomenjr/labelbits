import LabelDesigner from "../core";

/**
 * Creates a new ToolboxButton instance.
 *
 * This class represents a control button that can be used in the toolbox.
 *
 * @constructor
 *
 * @param {string} name - The name of the control. This is used to generate the id and icon class names.
 * @param {function} [onClick] - The click handler function for the control. If not provided, a default error message will be logged.
 *
 * @return {ToolboxButton} The newly created ToolboxButton instance.
 */
export function ToolboxButton(name, onClick) {

    /**
     * The id of the control button element.
     * @type {string}
     */
    this.id = `btn-${name}`;

    /**
     * The class name for the icon of the control button element.
     * @type {string}
     */
    this.icon = `icon-${name}`;

    /**
     * The click handler function for the control.
     * If not provided, a default error message will be logged.
     * @type {function}
     */
    this.onClick = onClick || (() => console.error(`No click handler for ${name}`));
}

/**
 * Creates a new Toolbox instance.
 *
 * @param {LabelDesigner} designer - The designer object that the toolbox will be associated with.
 * @return {Toolbox} The newly created Toolbox instance.
 */
function Toolbox(designer) {
    /**
     * The designer object that the toolbox is associated with.
     * @type {LabelDesigner}
     */
    this.designer = designer;

    /**
     * The list of controls available in the toolbox.
     * Each control is represented by a ToolboxButton instance.
     * @type {ToolboxButton[]}
     */
    this.controls = [
        // Textbox control
        new ToolboxButton(`text-plus`, () => this.designer.addTextbox()),
        // Rectangle control
        new ToolboxButton(`rectangle-plus`, () => this.designer.addRectangle()),
        // Export JSON control
        new ToolboxButton(`export-json`, () => this.designer.toJson()),
    ];

    console.log(`Toolbox started.`);
}

export default Toolbox;