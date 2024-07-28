import htmx from 'htmx.org';
import App from "./app/App";

htmx.on(`htmx:load`, (_) => App.start());

