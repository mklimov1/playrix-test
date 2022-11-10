import { show } from "../methods/animationMethods";
import Sprite from "./Sprite";

export default class Banner extends Sprite {
  show() {
    show({
      targets: this,
      duration: 500,
    });
  }
}
