import Page from "classes/Page";
import Navigation from "components/Navigation";

export default class Team extends Page {
  constructor() {
    super({
      id: "team",
      element: ".team__wrapper",
      elements: {
        image: ".team__hero__media",
      },
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
