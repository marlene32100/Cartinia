import Home from "pages/Home";
import Team from "pages/Team";
import Contact from "pages/Contact";
import OnSale from "pages/OnSale";
import Sold from "pages/Sold";

class App {
  constructor() {
    this.createContent();
    this.createPages();
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      home: new Home(),
      team: new Team(),
      onSale: new OnSale(),
      sold: new Sold(),
      contact: new Contact(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    console.log(this.page);
  }
}

new App();
