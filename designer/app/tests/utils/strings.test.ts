import { camelToKebabCase, camelToTitleCase } from "@labelbits/designer-shared/utils";


describe("camelToTitleCase", () => {
    it("should convert a camel case string to title case", () => {
        expect(camelToTitleCase("helloWorld")).toBe("Hello World");
        expect(camelToTitleCase("camelCase")).toBe("Camel Case");
        expect(camelToTitleCase("")).toBe("");
        expect(camelToTitleCase("hello123")).toBe("Hello123");
    });
});

describe("camelToKebabCase", () => {
    it("should convert a camel case string to kebab case", () => {
        expect(camelToKebabCase("helloWorld")).toBe("hello-world");
        expect(camelToKebabCase("camelCase")).toBe("camel-case");
        expect(camelToKebabCase("")).toBe("");
        expect(camelToKebabCase("hello123")).toBe("hello123");
    });
})