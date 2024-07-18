import htmx from 'htmx.org';
import App from "./app/index";

htmx.on(`htmx:load`, function (evt) {

    App.start();
});

