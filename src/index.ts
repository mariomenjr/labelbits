import htmx from 'htmx.org'; // Import the htmx library
import App from "./app/App"; // Import the App class from the app module

/**
 * Initialize the htmx library and start the application.
 * This function is called when the htmx library is loaded.
 */
htmx.on(`htmx:load`, _ => {
    // Start the application when the htmx library is loaded
    App.start();
});

