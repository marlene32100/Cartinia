import Page from "classes/Page";

export default class Sale extends Page {
  constructor() {
    super({
      id: "sale",
      element: ".sale__wrapper",
      elements: {
        banner: ".on_sale__banner",
      },
    });
  }

  create() {
    super.create();
  }
}
