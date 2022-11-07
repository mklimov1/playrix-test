export default class Graphics extends PIXI.Graphics {
  constructor(width, height, properties = {}) {
    const props = {
      origin: 0.5,
      ...properties,
    };
    super();

    this.drawRect(0, 0, width, height);
    this.drawingSize = {
      width,
      height,
    };

    this.set(props);
  }
}
