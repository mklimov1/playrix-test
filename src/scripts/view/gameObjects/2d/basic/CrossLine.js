import { animateAlpha, animateElem, stopAnimations } from "../../../controllers/animationController";
import Container from "../primitive/Container";
import Rectangle from "../primitive/Rectangle";
import Sprite from "../primitive/Sprite";

class CrossLine extends Container {
  constructor(texture, props) {
    const line = new Sprite(texture);
    const {
      width,
      height,
    } = line.getDrawingSize();
    const mask = new Rectangle(width, height, 0x000000);

    super({ width, height }, [mask, line], props);

    line.mask = mask;

    this.activeObjects = {
      mask,
      line,
    };
  }

  show(duration, endCB) {
    const {
      mask,
    } = this.activeObjects;

    mask.x = -mask.getScaledWidth();

    animateElem({
      duration,
      targets: mask,
      props: {
        x: 0,
      },
      complete: endCB,
    });
  }

  stopAnimations() {
    const {
      mask,
    } = this.activeObjects;

    stopAnimations(mask);
  }
}

export default class Cross extends Container {
  constructor(textures) {
    const lineProps = [
      { angle: 45 },
      { angle: 135 },
    ];
    const lines = textures.map((texture, index) => new CrossLine(texture, lineProps[index]));

    super(lines);

    this.activeObjects = {
      lines,
    };
  }

  animate() {
    let lineId = 0;
    const { lines } = this.activeObjects;
    const { length } = lines;
    const duration = 150;
    const showLine = (line) => {
      line.set({ visible: true });
      line.show(duration, () => {
        lineId += 1;

        if (lineId < length) {
          showLine(lines[lineId]);
        } else {
          animateAlpha({
            targets: this,
            value: 0,
            duration: duration - 50,
            complete: () => {
              this.set({ visible: false });
            },
          });
        }
      });
    };

    this.stopAnimations();

    this.set({
      visible: true,
      alpha: 1,
    });

    lines.forEach((line) => {
      line.stopAnimations();
      line.set({ visible: false });
    });

    showLine(lines[lineId]);
  }

  stopAnimations() {
    stopAnimations(this);
  }
}
