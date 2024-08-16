import * as fabric from "fabric";

import { FabricObjectHandler } from "../../utils/handlers";

import Plugin from "../../interfaces/Plugin";
import Action from "../../interfaces/Action";
import { createSetting, Setting, SettingBinder, SettingType } from "../../app/Settings";

export type PluginObject = fabric.Object & {
    getSettings: (object: fabric.Object) => Setting[];
};

/**
 * Represents a plugin for objects in the Fabric.js library.
 * It provides an abstract base class for creating plugins that can be used in the application.
 */
export default abstract class FabricObjectPlugin implements Plugin<FabricObjectHandler> {
    /**
     * The name of the plugin.
     */
    name: string;

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

    protected getPropertiesNames(): string[] {
        return [`left`, `top`];
    }

    protected getSettings(object: fabric.Object): Setting[] {
        return this.getPropertiesNames().map(propName => createSetting(propName, this.bindProperty(object, propName)));
    }

    protected bindProperty(object: fabric.Object, propName: string): SettingBinder {
        return {
            getValue(): SettingType {
                return object.get(propName);
            },

            setValue(v: SettingType) {
                object.set(propName, v);

                object.setCoords();
                object.canvas?.requestRenderAll();
                object.fire('modified');
            }
        };
    }

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
                const e = o as PluginObject;

                e.getSettings = this.getSettings.bind(this);
                // o.on('selected', (e) => console.debug(`Selected 1 ${this.name}`, {e}));
                // o.on('selected', (e) => console.debug(`Selected 2 ${this.name}`, {e}));
                // o.on('moving', (e) => console.debug(`Moving ${this.name}`, {e}));

                handler(o);
            }
        };
    }
}
