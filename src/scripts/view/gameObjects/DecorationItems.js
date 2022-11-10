import { animate, stopAnimations } from "../methods/animationMethods";
import { setProps } from "../methods/gameObjectsMathods";
import Container from "./Container";
import Sprite from "./Sprite";

export default class DecorationItems extends Container {
  constructor(textures, props = {}) {
    const items = textures.map((texture) => new Container([new Sprite(texture)]));
    super(items, props);

    this.items = items;
  }

  showItem(id, duration = 300) {
    const { items } = this;

    items.forEach((item, index) => {
      stopAnimations(item);

      if (id === index) {
        setProps(item, { visible: true });
        animate({
          duration,
          targets: item.children[0],
          alpha: {
            value: [0, 1],
            duration: duration * 0.8,
          },
          y: [item.height * -0.05, 0],
          easing: `easeInQuad`,
        });
      } else if (item.visible) {
        setProps(item, { visible: false });
      }
    });
  }
}
