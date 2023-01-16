import {
  animate, hide, show, stopAnimations
} from "../methods/animationMethods";
import { setProps } from "../methods/gameObjectsMethods";
import Container from "./Container";

export default class Icon extends Container {
  constructor(children, props = {}) {
    const wrapper = new Container(children);
    super(wrapper, {
      cursor: `pointer`,
      interactive: true,
      ...props,
    });
    this.wrapper = wrapper;
  }

  show(cb = () => {}) {
    setProps(this, { visible: true });
    show({ targets: this, duration: 500, complete: cb });
  }

  hide(cb = () => {}) {
    hide({
      targets: this,
      duration: 500,
      complete: () => {
        setProps(this, { visible: false });
        cb();
      },
    });
  }

  stopAnimations() {
    stopAnimations(this, this.wrapper);
  }

  verticalBounce(scale = -0.1, duration = 1000) {
    const { wrapper } = this;

    animate({
      duration,
      targets: wrapper,
      y: [0, wrapper.height * scale],
      loop: true,
      direction: `alternate`,
      easing: `easeInOutQuad`,
    });
  }
}
