import Component from "classes/Component";
import each from "lodash/each";

export default class Footer extends Component {
  constructor() {
    super({
      element: ".footer",
      elements: {
        images: document.querySelectorAll(
          ".footer__media__image,.footer__social__icon__image"
        ),
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
    console.log("Loaded image");
  }
}
