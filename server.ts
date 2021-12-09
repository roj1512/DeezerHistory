import { Application, Router } from "https://deno.land/x/oak@v10.0.0/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v10.0.0/helpers.ts";
import env from "./env.ts";

export const app = new Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(`Error handling request from ${ctx.request.ip}: ${err}`);
  }
});

const router = new Router();

router.get("/", async (ctx) => {
  const { code } = getQuery(ctx);

  if (!code) {
    ctx.response.redirect("/auth");
    return;
  }

  const { access_token: accessToken } = await (await fetch(
    `https://connect.deezer.com/oauth/access_token.php?app_id=${env.APP_ID}&secret=${env.APP_SECRET}&code=${code}}`,
  )).json();

  ctx.response.redirect(
    `https://t.me/${env.BOT_USERNAME}?start=sak${accessToken}`,
  );
});

router.get("/auth", (ctx) => {
  const { code } = getQuery(ctx);

  if (!code) {
    return;
  }

  const state = crypto.randomUUID();

  ctx.response.redirect(
    `https://connect.deezer.com/oauth/auth.php?app_id=${env.APP_ID}&redirect_uri=${env.APP_REDIR_URL}&perms=${env.APP_PERMISSIONS}&state=${state}`,
  );
});

app.use(router);
