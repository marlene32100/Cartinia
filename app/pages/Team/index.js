import Page from "classes/Page";

export default class Team extends Page {
  constructor() {
    super({
      id: "team",
      element: ".team__wrapper",
      elements: {
        image: ".team__hero__media",
      },
    });
  }

  create() {
    super.create();
  }
}
