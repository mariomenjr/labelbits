import { Action, Collection } from "@labelbits/designer-shared";

/**
 * Represents a collection of actions that can be used in the toolbox.
 * It extends the Collection class and provides a constructor to initialize the toolbox.
 * @extends {Collection<Action>}
 */
export default class Toolbox extends Collection<Action> {

    /**
     * Constructs a new Toolbox instance.
     *
     * @constructor
     * @param {...Action[]} actions - An array of Action objects representing the actions in the toolbox.
     */
    constructor(...actions: Action[]) {
        super(...actions);

        // Log a message indicating that the toolbox has been initialized.
        console.debug(`Toolbox initialized.`);
    }
}
