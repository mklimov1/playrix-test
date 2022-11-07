export default class TilingSprite extends PIXI.TilingSprite {
  constructor(texture, size, properties = {}) {
    const props = {
      origin: 0.5,
      ...properties,
    };

    super(texture, size.width, size.height);

    this.drawingSize = {
      width: this.width || this.getLocalBounds().width,
      height: this.height || this.getLocalBounds().height,
    };

    this.set(props);
  }
}
