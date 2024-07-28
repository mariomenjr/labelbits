import LabelDesigner from "../app/LabelDesigner";

/**
 * Represents an object that is responsible for designing labels.
 * It is associated with a LabelDesigner instance.
 */
export default class Designee {

    /**
     * The label designer instance that the toolbox is associated with.
     */
    protected designer: LabelDesigner;

    /**
     * Constructs a new Designee instance.
     *
     * @param {LabelDesigner} designer - The label designer instance that the toolbox is associated with.
     */
    constructor(designer: LabelDesigner) {

        this.designer = designer;
    }
}
