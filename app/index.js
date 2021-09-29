import Navigation from "components/Navigation";
import Footer from "components/Footer";
import Home from "pages/Home";
import Team from "pages/Team";
import Contact from "pages/Contact";
import Sale from "pages/Sale";
import Sold from "pages/Sold";

import each from "lodash/each";

class App {
  constructor() {
    this.createContent();
    this.createNavigation();
    this.createFooter();
    this.createPages();

    this.addLinkListeners();
  }

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
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
  }

  async onChange(url) {
    await this.page.hide();
    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");

      div.innerHTML = html;

      const divContent = div.querySelector(".content");

      this.template = divContent.getAttribute("data-template");
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

  openMenu() {
    this.navigation.goFront();
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;

        if (
          link.className === "navigation__hamburger__link" ||
          link.className === "navigation__link"
        ) {
          const typeOfLink = link.className;
          if (typeOfLink === "navigation__link") {
            const actualUrl = window.location.pathname;
            actualUrl == "/"
              ? window.scrollTo({ top: 0, behavior: "smooth" })
              : this.onChange(href);
          } else if (typeOfLink === "navigation__hamburger__link") {
            this.openMenu();
          }
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
          this.onChange(href);

          console.log("I am a normal link");
        }
      };
    });
  }
}

new App();
