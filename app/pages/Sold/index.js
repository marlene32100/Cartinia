import Page from "classes/Page";
import Navigation from "components/Navigation";

export default class Sold extends Page {
  constructor() {
    super({
      id: "sold",
      element: ".sold__wrapper",
      elements: {},
    });
    this.createNavigation();
  }

  create() {
    super.create();
  }

  createNavigation() {
    this.navigation = new Navigation();
  }
}
