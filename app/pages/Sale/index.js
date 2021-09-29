import Page from "classes/Page";
import Navigation from "components/Navigation";

export default class Sale extends Page {
  constructor() {
    super({
      id: "sale",
      element: ".sale__wrapper",
      elements: {
        banner: ".on_sale__banner",
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
