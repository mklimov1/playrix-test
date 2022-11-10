import { animate, scaleAnimation, stopAnimations } from "../methods/animationMethods";
import { setProps } from "../methods/gameObjectsMathods";
import Circle from "./CIrcle";
import Icon from "./Icon";
import Sprite from "./Sprite";

export default class StairIcon extends Icon {
  constructor(texture, props = {}) {
    const icon = new Sprite(texture, {
      baseSize: [100, 100],
    });
    const colors = {
      default: 0xfdf4e1,
      checked: 0xaddd04,
    };
    const radius = icon.baseSize.width * 0.6;
    const frame = new Circle(radius, colors.default);
    const checkedFrame = new Circle(radius, colors.checked, {
      visible: false,
    });

    super([frame, checkedFrame, icon]);

    this.frames = {
      default: frame,
      checked: checkedFrame,
    };
    setProps(this, props);
  }

  select() {
    const { wrapper, frames: { checked: checkedFrame } } = this;

    stopAnimations(wrapper, checkedFrame);
    setProps(checkedFrame, { visible: true });

    scaleAnimation({
      targets: wrapper,
      value: 1.05,
      duration: 300,
    });
    scaleAnimation({
      targets: checkedFrame,
      value: [0, 1],
      duration: 300,
    });
  }

  unselect() {
    const { wrapper, frames: { checked: checkedFrame } } = this;

    stopAnimations(wrapper, checkedFrame);

    scaleAnimation({
      targets: wrapper,
      value: 1,
      duration: 300,
    });
    scaleAnimation({
      targets: checkedFrame,
      value: [1, 0],
      duration: 300,
      complete: () => {
        setProps(checkedFrame, { visible: false });
      },
    });
  }

  show() {
    const { wrapper } = this;

    setProps(this, { visible: true });
    animate({
      targets: wrapper,
      duration: 500,
      y: {
        value: [wrapper.height * -0.3, 0],
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
