//import Preloader from "components/Preloader";
//import Navigation from "components/Navigation";
import Home from "pages/Home";
import Team from "pages/Team";
import Contact from "pages/Contact";
import Sale from "pages/Sale";
import Sold from "pages/Sold";

import each from "lodash/each";

class App {
  constructor() {
    //this.createPreloader();
    //this.createNavigation();
    this.createContent();
    this.createPages();

    this.addLinkListeners();
  }

  //createPreloader() {
  //  this.preloader = new Preloader();
  //  this.preloader.once("completed", this.onPreloaded.bind(this));
  //}

  //createNavigation() {
  //  this.navigation = new Navigation();
  //}

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

  //onPreloaded() {
  //  this.preloader.destroy();
  //}

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

  addLinkListeners() {
    const links = document.querySelectorAll("a");
    const menu = document.querySelector(".navigation__hamburger");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;

        if (link.className === "navigation__hamburger__link") {
          const actualUrl = window.location.href;
          this.onChange(actualUrl + "#navigation__open");
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
