import GSAP from "gsap";
import each from "lodash/each";
export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = { ...elements };
    this.id = id;
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (value, key) => {
      if (
        value instanceof window.HTMLElement ||
        value instanceof window.NodeList ||
        Array.isArray(value)
      ) {
        // if value is already an actual element or array of any type, save it as is
        this.elements[key] = value;
      } else {
        // if value is a selector, get the element and save that
        this.elements[key] = document.querySelectorAll(value);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(value);
        }
      }
    });
  }

  show() {
    return new Promise((resolve) => {
      GSAP.fromTo(
        this.element,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 2,
          onComplete: resolve,
        }
      );
    });
  }

  hide() {
    return new Promise((resolve) => {
      GSAP.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }

  goBack() {
    return new Promise((resolve) => {
      GSAP.to(this.element, { autoAlpha: 0 });
    });
  }
}
