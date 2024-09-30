import { PluginOptions } from "@labelbits/designer-shared/fabric";

export const defaultOptions: PluginOptions = {
    text: { value: `1234567890`, isNative: false },
    font: {
        value: `monospace`,
        isNative: false,
        select: {
            values: [`monospace`, `serif`, `sans-serif`],
            type: `dropdown`
        }
    },
    width: { value: 2, isNative: false },
    format: {
        value: `CODE128`,
        isNative: false,
        select: {
            values: [`CODE128`, `CODE39`, `MSI`],
            type: `dropdown`
        }
    },
    margin: { value: 5, isNative: false },
    height: { value: 100, isNative: false },
    fontSize: { value: 20, isNative: false },
    textAlign: {
        value: `center`,
        isNative: false,
        select: {
            values: [`left`, `center`, `right`],
            type: `dropdown`,
        }
    },
    textMargin: { value: 1, isNative: false },
    textPosition: {
        value: `bottom`,
        isNative: false,
        select: {
            values: [`top`, `bottom`],
            type: `dropdown`
        }
    },
    displayValue: { value: true, isNative: false },
};