import { idleAnimation } from "../methods/animationMethods";
import SpriteContainer from "./SpriteContainer";

export default class Persona extends SpriteContainer {
  constructor(texture, spriteProps = {}, containerProps = {}) {
    super(texture, {
      origin: [0.5, 0.95],
      ...spriteProps,
    }, {
      containerProps,
    });
  }

  idleAnimation() {
    idleAnimation({
      targets: this.child,
      y: 0.985,
      duration: 3000,
    });
  }
}
