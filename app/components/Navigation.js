import Component from "classes/Component";
import GSAP from "gsap";

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: ".navigation",
      elements: {},
    });

    //this.onNavigation(template);
  }

  onNavigation() {
    const hamburger = document.querySelector(".navigation__hamburger");
    hamburger.addEventListener("click", openMenu());
  }
}
