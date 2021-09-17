require("dotenv").config();

const express = require("express");
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

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

app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

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

app.get("/", async (req, res) => {
  initApi(req).then((api) => {
    api
      .query(
        Prismic.Predicates.any("document.type", [
          "home",
          "meta",
          "navbar",
          "homedown",
          "navigation",
        ])
      )
      .then((response) => {
        const { results } = response;
        const [home, meta, navbar, homedown, navigation] = results;
        console.log(navigation.data.link[0]);
        res.render("pages/home", { home, meta, navbar, homedown, navigation });
      });
  });
});

app.get("/team", async (req, res) => {
  const api = await initApi(req);
  const team = await api.getSingle("team");
  const meta = await api.getSingle("meta");
  const navbar = await api.getSingle("navbar");
  const navigation = await api.getSingle("navigation");
  const footer = await api.getSingle("footer");

  console.log(footer.data.social_icons);
  res.render("pages/team", { team, meta, navbar, navigation, footer });
});

app.get("/on-sale", async (req, res) => {
  initApi(req).then((api) => {
    api
      .query(Prismic.Predicates.any("document.type", ["on_sale", "meta"]))
      .then((response) => {
        const { results } = response;
        const [on_sale, meta] = results;
        console.log(on_sale.data.body[0].primary);
        res.render("pages/on-sale", { on_sale, meta });
      });
  });
});

app.get("/sold", async (req, res) => {
  initApi(req).then((api) => {
    api
      .query(Prismic.Predicates.any("document.type", ["sold", "meta"]))
      .then((response) => {
        const { results } = response;
        const [meta, sold] = results;
        console.log(sold.data.cars[0]);
        res.render("pages/sold", { meta, sold });
      });
  });
});

app.get("/contact", async (req, res) => {
  const navbar = await api.getSingle("navbar");
  const navigation = await api.getSingle("navigation");
  const footer = await api.getSingle("footer");
  res.render("pages/contact", { navbar, navigation, footer });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
