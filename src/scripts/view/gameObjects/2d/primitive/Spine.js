export default class Spine extends PIXI.spine.Spine {
  constructor(texture, properties = {}) {
    const props = {
      origin: 0.5,
      ...properties,
    };

    super(texture);

    this.drawingSize = {
      width: this.width || this.getBounds().width,
      height: this.height || this.getBounds().height,
    };

    this.set(props);
  }

  setSpineAnimation(animationName, loop) {
    const { state } = this;

    state.setAnimation(0, animationName, loop);
  }

  setSpineSkin(skinName) {
    const { skeleton } = this;

    skeleton.setSkin(null);
    skeleton.setSkinByName(skinName);
  }

  addSpineListener(eventObject) {
    const { state } = this;

    state.addListener(eventObject);
  }

  clearSpineListeners() {
    const { state } = this;

    state.clearListeners();
  }

  setSpineTimeScale(value) {
    const { state } = this;

    state.timeScale = value;
  }
}
