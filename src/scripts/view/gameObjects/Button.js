import { animate, scaleAnimation } from "../methods/animationMethods";
import { setProps } from "../methods/gameObjectsMethods";
import Icon from "./Icon";
import Sprite from "./Sprite";

export default class Button extends Icon {
  constructor(texture, props = {}) {
    const icon = new Sprite(texture);
    super(icon, props);

    this.icon = icon;
  }

  scaleBounce(scale = -0.1, duration = 1000) {
    const { icon } = this;

    scaleAnimation({
      duration,
      targets: icon,
      value: [1, 1 - scale],
      easing: `easeOutQuad`,
      direction: `alternate`,
      loop: true,
    });
  }

  show() {
    const { wrapper } = this;

    setProps(this, { visible: true });
    animate({
      targets: wrapper,
      duration: 500,
      y: {
        value: [wrapper.height * 0.3, 0],
        easing: `easeOutBack`,
      },
      alpha: [0, 1],
    });
  }

  hide() {
    const { wrapper } = this;

    animate({
      targets: wrapper,
      duration: 500,
      y: {
        value: [0, wrapper.height * 0.3],
        easing: `easeInBack`,
      },
      alpha: [1, 0],
      complete() {
        setProps(this, { visible: false });
      },
    });
  }
}
