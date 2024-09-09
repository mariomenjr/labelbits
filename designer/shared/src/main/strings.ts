/**
 * Converts a camel case string to title case.
 * 
 * Title case capitalizes the first letter of each word and separates words with spaces.
 * 
 * @param {string} input - The camel case string to convert.
 * @returns {string} The converted string in title case.
 * 
 * @example
 * // Returns 'Camel Case String'
 * camelToTitleCase('camelCaseString');
 */
export function camelToTitleCase(input: string): string {
    // Insert a space before capital letters
    // Replace the first letter to uppercase
    // Capitalize the letters after spaces
    const tuc = (s: string) => s.toUpperCase();
    return input
        .replace(/([a-z])([A-Z])/g, '$1 $2')  // Insert space before capital letters
        .replace(/^./, tuc)                  // Capitalize the first letter
        .replace(/\s+[a-z]/g, tuc);          // Capitalize letters after spaces
}

/**
 * Converts a camel case string to kebab case.
 * 
 * Kebab case replaces camel case capital letters with hyphens and converts the entire string to lowercase.
 * 
 * @param {string} input - The camel case string to convert.
 * @returns {string} The converted string in kebab case.
 * 
 * @example
 * // Returns 'camel-case-string'
 * camelToKebabCase('camelCaseString');
 */
export function camelToKebabCase(input: string): string {
    // Insert a hyphen before capital letters
    // Convert the entire string to lowercase
    return input
        .replace(/([a-z])([A-Z])/g, '$1-$2')  // Insert hyphen before capital letters
        .toLowerCase();                       // Convert to lowercase
}
