const mainOptions = {
  resolution: devicePixelRatio || 1,
  forceCanvas: false,
  autoDensity: true,
  backgroundAlpha: 0,
};

export default class Application extends PIXI.Application {
  constructor(customOptions = {}) {
    const options = {
      ...mainOptions,
      ...customOptions,
    };
    const scale = 1 / options.resolution;

    super(options);

    this.stage.application = this;
    this.stage.scale.set(scale);
  }

  setSize(width, height) {
    this.renderer.resize(width, height);
  }

  on(event, callback) {
    this.renderer.plugins.interaction.on(event, callback);
  }

  off(event, callback) {
    this.renderer.plugins.interaction.off(event, callback);
  }
}
