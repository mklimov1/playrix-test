import { show } from "../methods/animationMethods";
import { setProps } from "../methods/gameObjectsMathods";

export default class Container extends PIXI.Container {
  constructor(children, props = {}) {
    super();
    const baseSize = {
      width: 100, height: 100,
    };

    if (typeof children === `object`) {
      if (Array.isArray(children)) {
        this.addChild(...children);
        baseSize.width = children[0].width;
        baseSize.height = children[0].height;
      } else {
        this.addChild(children);
        baseSize.width = children.width;
        baseSize.height = children.height;
      }
    }

    this.baseSize = {
      width: baseSize.width,
      height: baseSize.height,
    };
    setProps(this, {
      origin: 0.5,
      interactive: false,
      ...props,
    });
  }

  show(cb) {
    show({
      targets: this,
      duration: 500,
      complete: cb,
    });
  }
}
