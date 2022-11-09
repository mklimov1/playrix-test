import { animate, scaleAnimation } from "../animations";
import Icon from "./Icon";
import Sprite from "./Sprite";

export default class Button extends Icon {
  constructor(texture, props = {}) {
    const icon = new Sprite(texture);
    super(icon, props);

    this.icon = icon;
  }

  verticalBounce(scale = -0.1, duration = 1000) {
    const { icon } = this;

    animate({
      duration,
      targets: icon,
      y: [0, icon.height * scale],
      loop: true,
      direction: `alternate`,
    });
  }

  scaleBounce(scale = 0.1, duration = 2000) {
    const { icon } = this;

    scaleAnimation({
      duration,
      targets: icon,
      value: scale,
      easing: `easeInOutQuad`,
      direction: `alternate`,
      loop: true,
    });
  }
}
