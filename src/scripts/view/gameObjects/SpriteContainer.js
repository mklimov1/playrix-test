import Container from "./Container";
import Sprite from "./Sprite";

export default class SpriteContainer extends Container {
  constructor(texture, spriteProps = {}, containerProps = {}) {
    const child = new Sprite(texture, spriteProps);
    super(child, containerProps);
    this.child = child;
  }
}
