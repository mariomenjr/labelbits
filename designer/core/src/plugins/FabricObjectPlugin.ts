import * as fabric from "fabric";

import { SettingsSource, SettingBinder, SettingType, createSetting } from "@labelbits/designer-shared/setting";
import {PluginObject, FabricObjectHandler,} from "@labelbits/designer-shared/fabric";
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

    /**
     * Retrieves the names of the properties of the fabric object that should be represented as settings.
     * @returns An array of property names.
     */
    protected getPropertiesNames(): string[] {
        return [`left`, `top`];
    }

    /**
     * Retrieves the settings source for the fabric object.
     * @param object The fabric object.
     * @returns A function that returns an array of settings.
     */
    protected getSettingsSource(object: fabric.Object): SettingsSource {
        return () => this.getPropertiesNames().map(propName => createSetting(propName, this.bindProperty(object, propName)));
    }

    /**
     * Binds a property of the fabric object to a setting.
     * @param object The fabric object.
     * @param propName The name of the property.
     * @returns A setting binder object.
     */
    protected bindProperty(object: fabric.Object, propName: string): SettingBinder {
        return {
            /**
             * Retrieves the value of the property.
             * @returns The value of the property.
             */
            getValue(): SettingType {
                return object.get(propName);
            },

            /**
             * Sets the value of the property.
             * @param v The new value of the property.
             */
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
                const p = o as PluginObject;

                p.getSettings = this.getSettingsSource(p);

                handler(o);
            }
        };
    }
}

