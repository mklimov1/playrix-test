import { getScaledHeight, setProps } from "../methods/gameObjectsMethods";
import Button from "./Button";

export default class TargetButton extends Button {
  constructor(texture, props = {}) {
    super(texture, props);
    this._target = null;
  }

  hasTarget() {
    return this._target !== null;
  }

  resetTarget() {
    this._target = null;
  }

  getTarget() {
    return this._target;
  }

  setTarget(target) {
    this._target = target;
  }

  updatePosition() {
    if (this.hasTarget()) {
      const t = this.getTarget();
      const tHeight = getScaledHeight(t);
      const offset = tHeight * 0.5 + getScaledHeight(this) * 0.4;

      setProps(this, {
        x: t.x,
        y: t.y + offset,

      });
    }
  }
}
