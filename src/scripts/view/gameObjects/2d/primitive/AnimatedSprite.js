export default class AnimatedSprite extends PIXI.AnimatedSprite {
  constructor(children, properties = {}) {
    const props = {
      origin: 0.5,
      ...properties,
    };

    super(children);

    this.drawingSize = {
      width: this.width || this.getBounds().width,
      height: this.height || this.getBounds().height,
    };

    this.set(props);
  }
}
