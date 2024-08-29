import * as fabric from "fabric";

import { FabricObjectHandler } from "../../utils/handlers";

import Plugin from "../../interfaces/Plugin";
import Action from "../../interfaces/Action";
import { PluginObject } from "../../utils/fabric";
import { Setting, SettingBinder, SettingType } from "../../app/Settings";
import { getSettingsSource } from "../../utils/plugins";

export type SettingsSource = () => Setting[];

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
     * The keys of the properties of the fabric object that should be represented as settings.
     */
    protected get propsKeys(): { name: string, binder: ((o: PluginObject, propName: string) => SettingBinder) | null }[] {
        const _updateObjectAsync = this.updateObjectAsync;
        return [{ name: `left`, binder: null }, { name: `top`, binder: null }, {
            name: `content`, binder: ((_o: PluginObject, _propName: string) => ({
                getValue(): SettingType {
                    return _o.get(_propName);
                },

                setValue(v: SettingType) {
                    _o.set(_propName, v);
                    _updateObjectAsync(_o);
                    _o.setCoords();
                    _o.canvas?.requestRenderAll();
                    _o.fire('modified');
                }
            }))
        }];
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

    abstract updateObjectAsync(object: fabric.Object): Promise<void>;

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
                p.getSettings = getSettingsSource(this.propsKeys, p);

                handler(o);
            }
        };
    }
}

