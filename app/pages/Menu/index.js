import Page from "classes/Page";
import GSAP from "gsap";

export default class Menu extends Page {
  constructor() {
    super({
      id: "menu",
      element: ".menu__wrapper",
      elements: {
        list: ".navigation__list__opened",
        items: ".navigation__list__item",
        links: ".navigation__list__link",
      },
    });
    this.goFront();
  }

  create() {
    super.create();
  }

  goFront() {
    this.animation = GSAP.timeline({});
    this.animation.to(this.element, { padding: 0 });
    this.animation.to(this.element, {
      height: "100vh",
      width: "100vw",
      autoAlpha: 1,
      stagger: 0.2,
      backgroundColor: "rgba(154, 197, 252, 0.4)",
    });
    this.showLinks();
  }

  showLinks() {
    const links = document.querySelectorAll("li");
    const hamburger = document.querySelector(".hamburger__menu");
    const close = document.querySelector(".hamburger__menu__close");
    this.animateIn = GSAP.timeline({
      delay: 2,
    });
    this.animateIn.fromTo(
      links,
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
}
