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
          "footer",
        ])
      )
      .then((response) => {
        const { results } = response;
        const [home, meta, navbar, homedown, navigation, footer] = results;
        console.log(footer.data.social_icons[0].icon);
        res.render("pages/home", {
          home,
          meta,
          navbar,
          homedown,
          navigation,
          footer,
        });
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
  const api = await initApi(req);
  const on_sale = await api.getSingle("on_sale");
  const meta = await api.getSingle("meta");
  const navbar = await api.getSingle("navbar");
  const navigation = await api.getSingle("navigation");
  const footer = await api.getSingle("footer");
  res.render("pages/on-sale", { on_sale, meta, navbar, navigation, footer });
});

app.get("/sold", async (req, res) => {
  const api = await initApi(req);
  const sold = await api.getSingle("sold");
  const meta = await api.getSingle("meta");
  const navbar = await api.getSingle("navbar");
  const navigation = await api.getSingle("navigation");
  const footer = await api.getSingle("footer");
  res.render("pages/sold", { sold, meta, navbar, navigation, footer });
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
