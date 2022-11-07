import Graphics from "./Graphics";

export default class Ellipse extends Graphics {
  constructor(width, height, color, props) {
    super(width, height, props);

    if (Array.isArray(color)) {
      this.beginFill(...color);
    } else {
      this.beginFill(color);
    }

    this.drawEllipse(width * 0.5, height * 0.5, width * 0.5, height * 0.5);
    this.endFill();
  }
}
