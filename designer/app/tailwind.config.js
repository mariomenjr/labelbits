/**
 * Configuration for Tailwind CSS JIT mode.
 * This file defines the content that Tailwind CSS should analyze to generate utility classes.
 *
 * @see https://tailwindcss.com/docs/just-in-time-mode
 */

module.exports = {
    /**
     * Enable JIT mode for Tailwind CSS.
     * This improves performance by only generating the necessary CSS for the components used in the application.
     *
     * @type {string}
     */
    mode: 'jit',
    /**
     * Define the content that Tailwind CSS should analyze to generate utility classes.
     * This includes HTML, JavaScript, TypeScript, and Vue files in the `public` and `src` directories.
    *
    * @type {string[]}
    */
    content: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
};