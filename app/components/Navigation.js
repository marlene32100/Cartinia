import Component from "classes/Component";
import each from "lodash/each";
import GSAP from "gsap";

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: ".navigation",
      elements: {
        wrapper: ".navigation__wrapper",
        bar: ".navigation__bar",
        hamburger: ".navigation__hamburger",
        menu: ".navigation__open",
        items: ".navigation__list__item",
        image: document.querySelector(".navigation__link__icon"),
      },
    });
    this.elements.links = this.elements.menu.querySelectorAll("li");
    this.onChange(template);
    this.createLoader();
  }

  onChange(template) {
    console.log(template);
  }

  createLoader() {
    const image = this.elements.image;
    image.src = image.getAttribute("data-src");
  }

  showLinks() {
    const container = this.elements.menu.querySelector("ul");
    const links = this.elements.menu.querySelectorAll("li");

    container.classList.add("navigation__list__opened");

    this.animateIn = GSAP.timeline({
      delay: 2,
    });
    this.animateIn.fromTo(
      this.elements.links,
      { autoAlpha: 0, y: -50 },
      {
        autoAlpha: 1,
        duration: 2,
        ease: "expo.out",
        stagger: 0.2,
        y: 0,
      }
    );
  }

  goFront() {
    const menu = this.elements.menu;
    menu.style.position = "relative";
    this.animation = GSAP.timeline({});
    this.animation.to(this.elements.wrapper, { padding: 0 });
    this.animation.to(this.elements.bar, {
      autoAlpha: 0,
    });
    this.animation.to(menu, {
      height: "100vh",
      width: "100vw",
      autoAlpha: 1,
      stagger: 0.2,
      backgroundColor: "rgba(154, 197, 252, 0.4)",
    });
    this.showLinks();
  }
}
