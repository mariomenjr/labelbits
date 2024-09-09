import * as fabric from "fabric";

export type SvgOuput = {
    objects: fabric.Object[],
    options: Record<string, unknown>
};
