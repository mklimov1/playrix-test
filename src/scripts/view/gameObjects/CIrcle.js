import { setProps } from "../utils";
import Graphics from "./Graphics";

export default class Circle extends Graphics {
  constructor(radius, color, props = {}) {
    const width = radius * 2;
    const height = radius * 2;

    super(width, height);

    if (Array.isArray(color)) {
      this.beginFill(...color);
    } else {
      this.beginFill(color);
    }

    this.drawCircle(radius, radius, radius);
    this.endFill();

    setProps(this, {
      origin: 0.5,
      ...props,
    });
  }
}
