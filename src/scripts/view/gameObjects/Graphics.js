import { show } from "../animations";
import { setProps } from "../utils";

export default class Graphics extends PIXI.Graphics {
  constructor(width, height, props = {}) {
    super();

    this.drawRect(0, 0, width, height);
    this.baseSize = {
      width,
      height,
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
