require("dotenv").config();

const logger = require("morgan");
const express = require("express");
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const path = require("path");
const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, "public")));

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
  if (doc == "home") {
    return "/";
  }
  if (doc == "team") {
    return "/team";
  }
  if (doc == "on-sale") {
    return "/on-sale";
  }
  if (doc == "sold") {
    return "/sold";
  }
  if (doc == "contact") {
    return "/contact";
  }
};

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.Link = handleLinkResolver;

  res.locals.PrismicDOM = PrismicDOM;

  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const handleRequest = async (api) => {
  const meta = await api.getSingle("meta");
  const navbar = await api.getSingle("navbar");
  const navigation = await api.getSingle("navigation");
  const footer = await api.getSingle("footer");
  return {
    meta,
    navbar,
    navigation,
    footer,
  };
};

app.get("/", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const home = await api.getSingle("home");
  const homedown = await api.getSingle("homedown");
  res.render("pages/home", { ...defaults, home, homedown });
});

app.get("/team", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const team = await api.getSingle("team");
  res.render("pages/team", { ...defaults, team });
});

app.get("/on-sale", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const on_sale = await api.getSingle("on_sale");
  res.render("pages/on-sale", { ...defaults, on_sale });
});

app.get("/sold", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const sold = await api.getSingle("sold");
  res.render("pages/sold", { ...defaults, sold });
});

app.get("/contact", async (req, res) => {
  const api = await initApi(req);
  const defaults = await handleRequest(api);
  const contact = await api.getSingle("contact");
  res.render("pages/contact", { ...defaults, contact });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
