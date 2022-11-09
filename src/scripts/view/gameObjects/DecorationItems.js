import { setProps } from "../utils";
import Container from "./Container";
import Sprite from "./Sprite";

export default class DecorationItems extends Container {
  constructor(textures, props = {}) {
    const items = textures.map((texture) => new Sprite(texture));
    super(items, props);

    this.items = items;
  }

  showItem(id) {
    const { items } = this;

    items.forEach((item, index) => {
      if (id === index) {
        setProps(item, { visible: true });
      } else if (item.visible) {
        setProps(item, { visible: false });
      }
    });
  }
}
