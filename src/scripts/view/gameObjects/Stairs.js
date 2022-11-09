import { setProps } from "../utils";
import DecorationItems from "./DecorationItems";

export default class Stairs extends DecorationItems {
  constructor(textures, props = {}) {
    super(textures, props);
    const { items, baseSize: { width, height } } = this;
    const itemProps = [
      {
        x: width * -0.16,
        y: height * -0.08,
      },
      {
        x: width * -0.15,
        y: height * -0.06,
      },
      {
        x: width * -0.08,
        y: height * -0.06,
      },
      {},
    ];

    items.forEach((item, index) => {
      setProps(item, itemProps[index]);
    });

    this.showItem(3);
  }
}
