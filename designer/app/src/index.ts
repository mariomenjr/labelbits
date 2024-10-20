import App from "./app/App"; // Import the App class from the app module

/**
 * Hides the loading screen and displays the main application.
 *
 * Removes the element with the id "loading" and unhides the elements with the
 * names "main" and "header". Also removes the element with the name "style".
 *
 * @private
 */
function endLoading() {

    const tags = [
        {
            name: `main`,
        },
        {
            name: `header`,
        },
        {
            name: `style`,
        }
    ];

    for (const tag of tags) {

        const elements = document.getElementsByTagName(tag.name);
        for (const el of elements) {

            switch (tag.name) {    
                case `style`:
                    el.remove();
                    break;
                        
                default:
                    el.removeAttribute("hidden");
                    break;
            }
        }
    }

    document.getElementById("loading")!.remove();
}

/**
 * Starts the application when the page is loaded.
 * The application is started by calling the static {@link App.start} method.
 */
window.onload = function () {

    endLoading();
    App.start();
};
