import { show } from "../methods/animationMethods";
import Rectangle from "./Rectangle";

export default class Overlap extends Rectangle {
  constructor(color, alpha = 1, props = {}) {
    super(1000, 1000, [color, alpha], props);
  }

  show() {
    show({
      targets: this,
      duration: 500,
    });
  }
}
