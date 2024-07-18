import LabelDesigner from "../core/LabelDesigner";

interface ToolboxButton {
    id: string;
    icon: string;
    onClick: () => void;
}

/**
 * Creates a new ToolboxButton instance.
 *
 * This class represents a control button that can be used in the toolbox.
 *
 * @param {string} name - The name of the control. This is used to generate the id and icon class names.
 * @param {() => void} [onClick] - The click handler function for the control. If not provided, a default error message will be logged.
 *
 * @return {ToolboxButton} The newly created ToolboxButton instance.
 */
export function createToolboxButton(name: string, onClick?: () => void): ToolboxButton {
    return {
        id: `btn-${name}`,
        icon: `icon-${name}`,
        onClick: onClick ?? (() => console.error(`No click handler for ${name}`))
    };
}

export class Toolbox {

    private designer: LabelDesigner;
    public controls: ToolboxButton[];

    constructor(designer: LabelDesigner) {
        this.designer = designer;
        this.controls = [
            // Textbox control
            createToolboxButton("text-plus", () => this.designer.addTextbox()),
            // Rectangle control
            createToolboxButton("rectangle-plus", () => this.designer.addRectangle()),
            // Export JSON control
            createToolboxButton("export-json", () => this.designer.toJson()),
        ];

        console.log(`Toolbox started.`);
    }
}

// export default Toolbox;
