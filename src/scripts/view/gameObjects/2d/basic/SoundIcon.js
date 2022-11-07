import AbstractRectangle from "../abstract/AbstractRectangle";
import Container from "../primitive/Container";

export default class SoundIcon extends Container {
  constructor(opt, props) {
    const { onIcon, offIcon } = opt;
    const { width, height } = onIcon.getDrawingSize();
    const hitArea = new AbstractRectangle(width, height);

    super({ width, height }, [], props);

    this.addChild(onIcon, offIcon);

    this.set({
      hitArea,
      interactive: true,
    });

    this.activeObjects = {
      onIcon,
      offIcon,
    };
  }

  changeMuteIcon(muted) {
    const {
      onIcon,
      offIcon,
    } = this.activeObjects;

    onIcon.set({
      visible: !muted,
    });

    offIcon.set({
      visible: muted,
    });
  }
}
