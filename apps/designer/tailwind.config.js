const config = require("@labelbits/config/tailwind.config");

module.exports = {
    ...config,
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