import Component from "classes/Component";
import each from "lodash/each";
import GSAP from "gsap";

export default class Navigation extends Component {
  constructor(template) {
    super({
      element: ".navigation",
      elements: {
        wrapper: ".navigation__wrapper",
        bar: ".navigation__bar",
        hamburger: ".navigation__hamburger",
        menu: ".navigation__open",
        items: ".navigation__list__item",
        images: document.querySelector("navigation__link__icon"),
        links: ".navigation__list__link",
      },
    });
  }

  /*

  async onChange({ url }) {
    const request = await window.fetch(url);
    const area = this.element.nextElementSibling;
    await area.hide();
    const address = url;
    const pathArray = address.split("/");
    const template = pathArray[pathArray.length - 1];

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");

      div.innerHTML = html;

      const divContent = area;

      this.template = divContent.getAttribute("data-template");

      this.content.setAttribute("data-template", template);
      this.content.innerHTML = divContent.innerHTML;
      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();
      this.addLinkListeners();
    } else {
      console.log("Error");
    }
    // const content = this.element.nextElementSibling;
    // content.removeAttribute("data-template");
    // content.setAttribute("data-template", section);
    // this.hide();
  }

  addLinks() {
    const links = this.elements.menu.querySelectorAll("a");
    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;
        this.onChange({ url: href });
      };
    });
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
  */
}
