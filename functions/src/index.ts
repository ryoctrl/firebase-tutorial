import * as functions from "firebase-functions";
import * as express from "express";
import axios from "axios";
const urlOrigin = "https://ryoctrl-svelte-app.web.app/";

const ogpTitles = {
  "/agent_registration": "代理店登録フォーム",
  "/company_registration": "社販.com お申し込みフォーム",
  "/contracted_companies": "ご契約企業様_管理画面",
  "/sales_agents": "営業代理店様_管理画面",
  "/special_agents": "特約代理店様_管理画面",
  "/supervisors": "統括代理店様_管理画面",
};

const app = express();
app.use("*", async (req, res) => {
  const path = req.originalUrl;
  let html = await axios.get(urlOrigin).then((res) => res.data);

  if (!(path in ogpTitles)) {
    res.status(200).send(html);
    return;
  }

  const key = path as keyof typeof ogpTitles;

  html = html.replace(
    /<meta property="og:title" content="代理店管理システム" \/>/,
    `<meta property="og:title" content="${ogpTitles[key]}" />`
  );

  res.status(200).send(html);
});

export const ogp = functions.https.onRequest(app);
