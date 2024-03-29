import { show } from "../methods/animationMethods";
import { setProps } from "../methods/gameObjectsMethods";

export default class Sprite extends PIXI.Sprite {
  constructor(texture, props = {}) {
    super(texture, {
      interactive: false,
      ...props,
    });

    this.baseSize = {
      width: this.width,
      height: this.height,
    };
    setProps(this, {
      origin: 0.5,
      ...props,
    });
  }

  show(cb) {
    show({
      targets: this,
      duration: 500,
      complete: cb,
    });
  }
}
