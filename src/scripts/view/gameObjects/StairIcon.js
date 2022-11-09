import { setProps } from "../utils";
import Circle from "./CIrcle";
import Icon from "./Icon";
import Sprite from "./Sprite";

export default class StairIcon extends Icon {
  constructor(texture, props = {}) {
    const icon = new Sprite(texture, {
      baseSize: [100, 100],
    });
    const colors = {
      default: 0xfdf4e1,
      checked: 0xaddd04,
    };
    const radius = icon.baseSize.width * 0.6;
    const frame = new Circle(radius, colors.default);
    const checkedFrame = new Circle(radius, colors.checked, {
      visible: false,
    });

    super([frame, checkedFrame, icon]);

    this.frames = {
      default: frame,
      checked: checkedFrame,
    };
    setProps(this, props);
  }
}
