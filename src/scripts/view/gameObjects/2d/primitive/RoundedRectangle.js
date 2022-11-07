import Graphics from "./Graphics";

export default class RoundedRectangle extends Graphics {
  constructor(width, height, radius, color, props) {
    super(width, height, props);

    if (Array.isArray(color)) {
      this.beginFill(...color);
    } else {
      this.beginFill(color);
    }

    this.drawRoundedRect(0, 0, width, height, radius);
    this.endFill();
  }
}
