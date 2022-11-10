import { setProps } from "../methods/gameObjectsMathods";
import Graphics from "./Graphics";

export default class Rectangle extends Graphics {
  constructor(width, height, color, props = {}) {
    super(width, height);

    if (Array.isArray(color)) {
      this.beginFill(...color);
    } else {
      this.beginFill(color);
    }

    this.drawRect(0, 0, width, height);
    this.endFill();
    setProps(this, {
      origin: 0.5,
      ...props,
    });
  }
}
