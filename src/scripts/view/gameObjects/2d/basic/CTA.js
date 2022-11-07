import AbstractRectangle from "../abstract/AbstractRectangle";
import {
  animateAlpha, animateScale, fadeInDown, fadeInUp, fadeOutDown, fadeOutUp
} from "../../../controllers/animationController";
import Container from "../primitive/Container";
import Sprite from "../primitive/Sprite";

export default class CTA extends Container {
  constructor(texture, hideAnimation = `alpha`, showAnimation = `alpha`, props = {}) {
    const btn = new Sprite(texture);
    const { width, height } = btn.getDrawingSize();
    const hitArea = new AbstractRectangle(width, height);

    super([width, height], [], props);

    this.addChild(btn);

    this.set({
      hitArea,
      buttonMode: true,
      interactive: true,
    });
    this.animations = {
      show: showAnimation,
      hide: hideAnimation,
    };
    this.activeObjects = {
      btn,
    };
  }

  show(duration, endCB = () => {}) {
    const { btn } = this.activeObjects;
    const showAnimation = this.animations.show;

    btn.set(`alpha`, 0);

    switch (showAnimation) {
      case `fadeInUp`:
        fadeInUp({
          duration,
          targets: btn,
          ratio: 1,
          complete: endCB,
        });
        break;

      case `fadeInDown`:
        fadeInDown({
          duration,
          targets: btn,
          ratio: 1,
          complete: endCB,
        });
        break;

      case `alpha`:
      default:
        animateAlpha({
          duration,
          targets: btn,
          value: 1,
          complete: endCB,
        });
        break;
    }
  }

  hide(duration, endCB = () => {}) {
    const { btn } = this.activeObjects;
    const hideAnimation = this.animations.hide;

    switch (hideAnimation) {
      case `fadeOutUp`:
        fadeOutUp({
          duration,
          targets: btn,
          ratio: 1,
          complete: endCB,
        });
        break;

      case `fadeOutDown`:
        fadeOutDown({
          duration,
          targets: btn,
          ratio: 1,
          complete: endCB,
        });
        break;

      case `alpha`:
      default:
        animateAlpha({
          duration,
          targets: btn,
          value: 0,
          complete: endCB,
        });
        break;
    }
  }

  pulseButton(duration, endCB = () => {}) {
    const { btn } = this.activeObjects;

    btn.scale.set(1);

    animateScale({
      duration,
      targets: btn,
      value: 0.9,
      loop: 1,
      direction: `alternate`,
      complete: endCB,
    });
  }

  ciclicPulse(duration) {
    const { btn } = this.activeObjects;

    btn.scale.set(1);

    animateScale({
      duration,
      targets: btn,
      value: 0.9,
      loop: true,
      direction: `alternate`,
    });
  }
}
