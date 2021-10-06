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
        numberText: ".preloader__number__text",
        images: document.querySelectorAll("img"),
      },
    });

    split({
      element: this.elements.title,
      expression: "<br>",
    });

    split({
      element: this.elements.title,
      expression: "<br>",
    });

    this.elements.titleSpan = this.elements.title.querySelectorAll("span span");

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

    if (Math.round(percentage) > 40) {
      this.onLoaded();
    }

    this.elements.numberText.innerHTML = `${Math.round(percentage)}%`;
  }

  async onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      });
      this.animateOut.to(this.elements.titleSpan, {
        autoAlpha: 0,
        duration: 2,
        ease: "expo.out",
        stagger: 0.2,
        y: -50,
      });
      this.animateOut.to(
        this.elements.number,
        {
          autoAlpha: 0,
          duration: 2,
          ease: "expo.out",
          stagger: 0.2,
          y: -50,
        },
        "-=2"
      );
      this.animateOut.to(this.element, {
        duration: 2,
        autoAlpha: 0,
      });
      this.animateOut.call((_) => {
        this.emit("completed");
        resolve();
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
