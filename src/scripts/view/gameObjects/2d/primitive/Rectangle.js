import Graphics from "./Graphics";

export default class Rectangle extends Graphics {
  constructor(width, height, color, props) {
    super(width, height, props);

    if (Array.isArray(color)) {
      this.beginFill(...color);
    } else {
      this.beginFill(color);
    }

    this.drawRect(0, 0, width, height);
    this.endFill();
  }
}
