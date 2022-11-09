export default class Application extends PIXI.Application {
  constructor(options = {}) {
    const resolution = devicePixelRatio || 1;
    const scale = 1 / resolution;

    super({
      resolution,
      forceCanvas: false,
      autoDensity: true,
      autoStart: true,
      ...options,
    });

    this.stage.scale.set(scale);
  }
}
