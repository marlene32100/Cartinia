require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

const Prismic = require("@prismicio/client");
var PrismicDOM = require("prismic-dom");

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });
};

// Link Resolver
const handleLinkResolver = (doc) => {
  // Default to homepage
  return "/";
};

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: process.env.PRISMIC_ENDPOINT,
    linkResolver: handleLinkResolver,
  };

  res.locals.PrismicDOM = PrismicDOM;

  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  initApi(req).then((api) => {
    api
      .query(
        Prismic.Predicates.any("document.type", ["home", "meta", "homedown"])
      )
      .then((response) => {
        console.log(response);
        const { results } = response;
        const [home, meta, homedown] = results;
        res.render("pages/home", { home, meta, homedown });
      });
  });
});

app.get("/team", async (req, res) => {});

app.get("/sell", (req, res) => {
  res.render("pages/sell");
});

app.get("/sold", (req, res) => {
  res.render("pages/sold");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
