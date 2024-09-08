import * as fabric from "fabric";

import { SettingDefinitionCollection, getSettingCollectionSource } from "@labelbits/designer-shared/setting";
import { PluginObject, FabricObjectHandler, } from "@labelbits/designer-shared/fabric";
import { Plugin, Action } from "@labelbits/designer-shared";

/**
 * Represents a plugin for objects in the Fabric.js library.
 * It provides an abstract base class for creating plugins that can be used in the application.
 */
export default abstract class FabricObjectPlugin implements Plugin<FabricObjectHandler> {
    /**
     * The name of the plugin.
     */
    name: string;

    protected get settingDefinitions(): SettingDefinitionCollection {

        return new SettingDefinitionCollection(this.updateObjectAsync, ...[
            {
                name: `left`,
                isPluginBound: false
            },
            {
                name: `top`,
                isPluginBound: false
            },
            {
                name: `content`,
                isPluginBound: true
            }
        ]);
    }

    /**
     * Creates a new instance of the FabricObjectPlugin class.
     * @param name The name of the plugin.
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Creates a new Fabric.js object asynchronously.
     * @returns A promise that resolves to the created object.
     */
    abstract createObjectAsync(): Promise<fabric.Object>;

    abstract updateObjectAsync(object: fabric.Object): Promise<fabric.Object>;

    /**
     * Retrieves the action for the plugin asynchronously.
     * @param handler The handler function for the plugin.
     * @returns A promise that resolves to the action.
     */
    async getActionAsync(handler: FabricObjectHandler): Promise<Action> {
        return {
            // The id of the action
            id: `btn-${this.name}`,
            // The icon of the action
            icon: `icon-${this.name}`,
            // The onClick event handler for the action
            onClick: async () => {
                const o = await this.createObjectAsync();
                const p = o as PluginObject;

                p.content = ``;
                p.getSettings = getSettingCollectionSource(this.settingDefinitions, p);

                handler(o);
            }
        };
    }
}

