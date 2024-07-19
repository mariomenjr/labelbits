export function camelToTitleCase(input: string): string {
    return input
        .replace(/([a-z])([A-Z])/g, '$1 $2')  // Insert space before capital letters
        .replace(/^./, str => str.toUpperCase())  // Capitalize the first character
        .replace(/\s+[a-z]/g, str => str.toUpperCase());  // Capitalize after spaces
}

export function camelToKebabCase(input: string): string {
    return input
        .replace(/([a-z])([A-Z])/g, '$1-$2')  // Insert hyphen before capital letters
        .toLowerCase();  // Convert the entire string to lowercase
}