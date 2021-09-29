import Component from "classes/Component";
import each from "lodash/each";

export default class Navigation extends Component {
  constructor() {
    super({
      element: ".navigation",
      elements: {
        hamburger: ".navigation__hamburger",
        menu: ".navigation__open",
      },
    });
    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, (element) => {
      element.onload = (_) => this.onAssetLoaded(element);
      element.src = element.getAttribute("data-src");
    });
  }

  onAssetLoaded(element) {
    console.log(element);
  }
}
