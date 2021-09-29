import Page from "classes/Page";
import Preloader from "components/Preloader";
import Navigation from "components/Navigation";

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
    this.createPreloader();
    this.createNavigation();
  }

  create() {
    super.create();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  createNavigation() {
    this.navigation = new Navigation();
    this.navigation.once("completed", this.onPreloadedNav.bind(this));
  }

  onPreloaded() {
    this.preloader.destroy();
  }

  onPreloadedNav() {
    this.navigation.destroy();
  }
}
