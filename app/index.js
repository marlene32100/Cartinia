import Home from "pages/Home";
import Team from "pages/Team";
import Contact from "pages/Contact";
import Sale from "pages/Sale";
import Sold from "pages/Sold";

import each from "lodash/each";

class App {
  constructor() {
    this.createContent();
    this.createPages();

    this.addLinkListeners();
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
    console.log(this.pages);
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
    } else {
      console.log("Error");
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();

        const { href } = link;

        this.onChange(href);

        console.log(event, href);
      };
    });
  }
}

new App();
