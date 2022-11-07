import {
  animateAlpha,
  stopAnimations,
  animateElem,
  animateRotation,
} from "../../../controllers/animationController";
import Container from "../primitive/Container";
import Sprite from "../primitive/Sprite";

export default class HO extends Container {
  constructor(texture, props = {}) {
    const item = new Sprite(texture);
    const size = item.getDrawingSize();
    const wrapper = new Container(size, [item]);

    super(size, [wrapper], {
      interactive: true,
      ...props,
    });

    this.activeObjects = {
      item,
      wrapper,
    };
  }

  addGlow(texture, props) {
    const { wrapper } = this.activeObjects;
    const glow = new Sprite(texture);

    wrapper.addChildAt(glow, 0);
    this.activeObjects.glow = glow;
    glow.visible = false;

    if (props) {
      glow.set(props);
    }
  }

  animateGlow() {
    const { glow } = this.activeObjects;
    const duration = 1000;

    this.isGlowActivated = true;
    glow.set({
      alpha: 0,
      visible: true,
    });

    animateAlpha({
      duration,
      targets: glow,
      value: 1,
      loop: true,
      direction: `alternate`,
    });
  }

  hideGlow() {
    const { glow } = this.activeObjects;

    this.isGlowActivated = false;
    stopAnimations(glow);
    glow.hide(500 * glow.alpha, () => {
      glow.visible = false;
    });
  }

  drop() {
    const item = this;
    const hoWrapper = this.parent;
    const parentHeight = hoWrapper.getDrawingSize().height;
    const duration = 1000;

    animateRotation({
      targets: item,
      value: item.angle + 40,
      duration: duration * 0.7,
    });
    animateElem({
      targets: item,
      duration: duration * 0.3,
      props: {
        y: item.y - item.getScaledHeight() * 0.7,
      },
      easing: `easeInOutSine`,
      complete: () => {
        animateElem({
          targets: item,
          duration: duration * 0.7,
          props: {
            y: item.y + parentHeight,
          },
          easing: `easeInSine`,
          complete: () => {
            this.visible = false;
          },
        });
      },
    });
  }
}
