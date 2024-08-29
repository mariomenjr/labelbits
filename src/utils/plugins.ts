import * as fabric from "fabric";
import { createSetting, SettingBinder, SettingType } from "../app/Settings";
import { SettingsSource } from "../controllers/plugins/FabricObjectPlugin";
import { PluginObject } from "./fabric";

/**
 * Binds a property of the fabric object to a setting.
 * @param object The fabric object.
 * @param propName The name of the property.
 * @returns A setting binder object.
 */
export function bindProperty(object: fabric.Object, propName: string): SettingBinder {
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
 * Retrieves the settings source for the fabric object.
 * @param object The fabric object.
 * @returns A function that returns an array of settings.
 */
export function getSettingsSource(propSettings: { name: string, binder: ((o: PluginObject, propName: string) => SettingBinder) | null }[], object: PluginObject): SettingsSource {
    return () => propSettings.map(prop => {

        const binder = prop.binder != null ? prop.binder!(object, prop.name) : bindProperty(object, prop.name);
        // const binder = bindProperty(object, prop.name);
        return createSetting(prop.name, binder);
    });
}