import Page from "classes/Page";

export default class Menu extends Page {
  constructor() {
    super({
      id: "menu",
      element: ".menu__wrapper",
      elements: {
        list: ".navigation__list",
        items: ".navigation__list__item",
        links: ".navigation__list__link",
      },
    });
    this.goFront();
  }

  create() {
    super.create();
  }

  showLinks() {
    const container = this.elements.menu.querySelector("ul");

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
    const menu = this.element;
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
