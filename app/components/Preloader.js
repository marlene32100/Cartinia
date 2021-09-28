import GSAP from "gsap";
import Component from "classes/Component";
import each from "lodash/each";
import { split } from "utils/text";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        images: document.querySelectorAll("img"),
      },
    });

    this.elements.titleSpan = split({
      element: this.elements.title,
      expression: "<br>",
    });

    this.length = 0;

    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, (element) => {
      element.onload = (_) => this.onAssetLoaded(element);
      element.src = element.getAttribute("data-src");
    });
  }

  onAssetLoaded(element) {
    this.length += 1;
    const percentage = (this.length / this.elements.images.length) * 100;

    if (Math.round(percentage) === 100) {
      this.onLoaded();
    }

    this.elements.number.innerHTML = `${Math.round(percentage)}%`;
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      });
      this.animateOut.to(this.element, { autoAlpha: 0 });
      this.animateOut.call((_) => {
        this.emit("completed");
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
