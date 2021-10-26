import Navigation from "components/Navigation";
import Footer from "components/Footer";
import Home from "pages/Home";
import Team from "pages/Team";
import Contact from "pages/Contact";
import Sale from "pages/Sale";
import Sold from "pages/Sold";
import Menu from "pages/Menu";

import each from "lodash/each";

class App {
  constructor() {
    // this.createPreloader();
    this.createContent();
    this.createNavigation();
    this.createFooter();
    this.createPages();

    this.addLinkListeners();
    this.addEventListeners();
  }

  // createPreloader() {
  //   this.preloader = new Preloader();
  //   this.preloader.once("completed", this.onPreloaded.bind(this));
  // }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template });
  }

  createFooter() {
    this.footer = new Footer({ template: this.template });
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      home: new Home(),
      team: new Team(),
      sale: new Sale(),
      sold: new Sold(),
      contact: new Contact(),
      menu: new Menu(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
  }

  // onPreloaded() {
  //   this.preloader.destroy();
  //   console.log("Destroyed");
  // }

  async onChange({ url, push = true }) {
    await this.page.hide();
    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");

      if (push) {
        window.history.pushState({}, "", url);
      }

      div.innerHTML = html;

      const divContent = div.querySelector(".content");

      this.template = divContent.getAttribute("data-template");

      this.navigation.onChange(this.template);

      this.content.setAttribute("data-template", this.template);
      this.content.innerHTML = divContent.innerHTML;
      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();
      this.addLinkListeners();
    } else {
      console.log("Error");
    }
  }

  onPopState() {
    this.onChange({ url: window.location.pathname, push: false });
  }

  addEventListeners() {
    window.addEventListener("popstate", this.onPopState.bind(this));
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;
        if (link.className === "navigation__link") {
          const actualUrl = window.location.pathname;
          actualUrl == "/"
            ? window.scrollTo({ top: 0, behavior: "smooth" })
            : this.onChange({ url: href });
        } else if (
          link.className === "home__homedown__heroarea__button__link"
        ) {
          const address = link.href;
          const pathArray = address.split("#");
          const section = pathArray[1];
          document
            .getElementById(section)
            .scrollIntoView({ behavior: "smooth" });
        } else {
          this.onChange({ url: href });
        }
      };
    });
  }
}

new App();
