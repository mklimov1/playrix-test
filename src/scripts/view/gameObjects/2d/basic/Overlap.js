import Rectangle from "../primitive/Rectangle";

export default class Overlap extends Rectangle {
  constructor(width, height, color, alpha, props) {
    super(width, height, [color, alpha], props);
  }
}
