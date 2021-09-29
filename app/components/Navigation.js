import Component from "classes/Component";

export default class Navigation extends Component {
  constructor() {
    super({
      element: ".navigation",
      elements: {
        hamburger: ".navigation__hamburger",
        menu: ".navigation__open",
        image: document.querySelector(".navigation__link__icon"),
      },
    });
    this.createLoader();
  }

  createLoader() {
    const image = this.elements.image;
    image.src = image.getAttribute("data-src");
  }
}
