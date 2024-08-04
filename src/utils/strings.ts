/**
 * Converts a camel case string to title case.
 * 
 * @param input The input string to convert.
 * @returns The converted string.
 */
export function camelToTitleCase(input: string): string {
    // Insert a space before capital letters
    // Replace the first letter to uppercase
    // Capitalize the letters after spaces
    const tuc = (s: string) => s.toUpperCase();
    return input
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, tuc)
        .replace(/\s+[a-z]/g, tuc);
}

/**
 * Converts a camel case string to kebab case.
 * 
 * @param input The input string to convert.
 * @returns The converted string.
 */
export function camelToKebabCase(input: string): string {
    // Insert a hyphen before capital letters
    // Convert the entire string to lowercase
    return input
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase();
}
