import Page from "classes/Page";
import Navigation from "components/Navigation";

export default class Contact extends Page {
  constructor() {
    super({
      id: "contact",
      element: ".contact__wrapper",
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
