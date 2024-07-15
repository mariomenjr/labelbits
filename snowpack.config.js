/**
 * Snowpack configuration file.
 * This file specifies the Snowpack build configuration.
 *
 * @see https://www.snowpack.dev/reference/configuration
 */

// Import the plugins from the postcss.config file
const { plugins } = require("./postcss.config");

module.exports = {
    // Set the mount points for serving static files and the build output
    mount: {
        // Mount the `public` directory to the root URL (/) and serve it as static files
        public: '/',
        // Mount the `src` directory to `/dist` and serve it with Snowpack's build
        src: '/dist',
    },
    
    // Set the development server options
    devOptions: {
        // Set the port for the development server
        port: 1993,
        // Enable Hot Module Replacement
        hmr: true,
        // Set the path to the Tailwind CSS configuration file
        tailwindConfig: './tailwind.config.js',
    },
    
    // Set the plugins to be used by Snowpack
    plugins: [
        // Optimize the build output
        '@snowpack/plugin-optimize',
        // Use PostCSS for CSS processing
        ['@snowpack/plugin-postcss', { plugins }],
    ],
    
    // Set the build options
    buildOptions: {
        // Specify the output directory for the build
        out: 'build',
    },
};

