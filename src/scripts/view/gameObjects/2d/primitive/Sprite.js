export default class Sprite extends PIXI.Sprite {
  constructor(texture, properties = {}) {
    const props = {
      origin: 0.5,
      ...properties,
    };

    super(texture);

    this.drawingSize = {
      width: this.width || this.getLocalBounds().width,
      height: this.height || this.getLocalBounds().height,
    };

    this.set(props);
  }
}
