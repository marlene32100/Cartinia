import Page from "classes/Page";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home__wrapper",
      elements: {
        landing: ".home__landing",
        button: ".home__homedown__heroarea__button__item",
      },
    });
  }

  create() {
    super.create();
  }
}
