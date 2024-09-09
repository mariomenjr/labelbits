import htmx from "htmx.org"; // Import the htmx library
import App from "./app/App"; // Import the App class from the app module

/**
 * Initializes the htmx library and starts the application.
 * This function is called when the htmx library is loaded.
 *
 * @event htmx:load - The event fired by htmx when the library is loaded.
 */
htmx.on(`htmx:load`, _ => {
    // Start the application when the htmx library is loaded
    App.start();
});

