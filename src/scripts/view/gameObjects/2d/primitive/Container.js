export default class Container extends PIXI.Container {
  constructor(size, children = [], properties = {}) {
    const props = {
      origin: 0.5,
      ...properties,
    };
    const s = {
      width: 0,
      height: 0,
    };

    super();

    if (typeof children === `object`) {
      if (Array.isArray(children)) {
        if (children.length > 0) { this.addChild(...children); }
      } else {
        this.addChild(children);
      }
    }

    if (typeof size === `number`) {
      s.width = size;
      s.height = size;
    } else if (typeof size === `object`) {
      if (Array.isArray(size)) {
        [s.width, s.height] = size;
      } else {
        s.width = size.width;
        s.height = size.height;
      }
    }
    if ((!s.width || !s.height) && this.children.length > 0) {
      const childSize = this.children[0].getDrawingSize();

      s.width = childSize.width;
      s.height = childSize.height;
    }

    this.drawingSize = s;

    this.set(props);
  }
}
