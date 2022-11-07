/* eslint-disable no-param-reassign */
// import AbstractRectangle from "../../abstractObjectsController/rectangle";
import {
  animateAlpha,
  animateScale,
  stopAnimations,
  // fadeInDown,
  // fadeInUp,
  // fadeOutDown,
  // fadeOutUp,
} from "../../../controllers/animationController";
import Container from "../primitive/Container";
import Sprite from "../primitive/Sprite";

export default class Numbers extends Container {
  constructor(numbersTextures, number, originX, originY) {
    const numbers = numbersTextures.map(
      (texture) => new Sprite(texture, 0.5, 0.5)
    );

    super(undefined, numbers, {
      origin: [originX, originY],
    });

    this.activeObjects = {
      numbers,
    };

    if (typeof number === `number`) {
      this.setNumber(number);
    }
  }

  setNumber(id, duration) {
    const { numbers } = this.activeObjects;

    if (duration) {
      numbers.forEach((num, index) => {
        if (index === id) {
          this.showNumber(index, duration);
        } else {
          this.hideNumber(index, duration);
        }
      });
    } else {
      numbers.forEach((num, index) => {
        num.visible = index === id;
      });
    }
  }

  showNumber(id, duration) {
    const { numbers } = this.activeObjects;
    const number = numbers[id];

    stopAnimations(number);
    number.visible = true;
    number.alpha = 0;
    number.scale.set(1.3);

    animateAlpha({
      duration,
      targets: number,
      value: 1,
    });
    animateScale({
      duration,
      targets: number,
      value: 1,
    });
  }

  hideNumber(id, duration) {
    const { numbers } = this.activeObjects;
    const number = numbers[id];

    stopAnimations(number);
    animateAlpha({
      duration,
      targets: number,
      value: 0,
      complete: () => {
        number.visible = false;
      },
    });
  }
}
