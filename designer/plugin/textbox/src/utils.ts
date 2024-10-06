import { PluginOptions } from "@labelbits/designer-shared/fabric";

export function getDefaults(): PluginOptions {
    return {
        text: {
            isNative: true,
            value: `labelbits`,
            textarea: {
                rows: 3,
                cols: 20,
                spellcheck: true,
                maxlength: 100,
                minlength: 0
            }
        },
        textAlign: {
            isNative: true,
            select: {
                values: [
                    `left`,
                    `center`,
                    `right`,
                    `justify`,
                    `justify-left`,
                    `justify-center`,
                    `justify-right`
                ],
                type: `dropdown`
            }
        },
        fontSize: { isNative: true, value: 16 },
        fontStyle: {
            isNative: true,
            select: {
                values: [`normal`, `italic`, `oblique`],
                type: `dropdown`
            }
        },
        fontWeight: {
            isNative: true,
            select: {
                values: [`normal`, `bold`],
                type: `dropdown`
            }
        },
        lineHeight: { isNative: true },
        charSpacing: { isNative: true },
        linethrough: { isNative: true },
        underline: { isNative: true },
        overline: { isNative: true },
    };
};