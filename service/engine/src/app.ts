import Koa from "koa";
import Router from "koa-router";

const port = 1997;

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = { message: 'Bonjour, le monde!' };
});

app.use(router.routes());

app.listen(port, () => console.log(`🌎 Listening on port ${port}`));
