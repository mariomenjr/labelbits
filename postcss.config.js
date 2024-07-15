/**
 * Configuration for PostCSS plugins.
 * This file specifies the PostCSS plugins to be used for processing CSS.
 *
 * @see https://github.com/postcss/postcss-cli
 */

module.exports = {
    // Specify the plugins to be used for processing CSS.
    // Here, we are using the Tailwind CSS plugin and other plugins can be added here.
    plugins: {
        /**
         * The Tailwind CSS plugin.
         * This plugin provides a set of utility classes for building user interfaces.
         *
         * @see https://tailwindcss.com/docs/installation
         */
        tailwindcss: {},

        // Other PostCSS plugins can be added here, such as autoprefixer.
        // For example:
        // autoprefixer: {},
    },
};
