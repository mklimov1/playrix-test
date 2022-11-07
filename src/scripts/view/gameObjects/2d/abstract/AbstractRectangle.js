export default class AbstractRectangle extends PIXI.Rectangle {
  constructor(width, height, originX, originY) {
    const origin = {
      x: typeof originX === `number` ? originX : 0.5,
      y: typeof originY === `number` ? originX : 0.5,
    };
    const x = -width * origin.x;
    const y = -height * origin.y;

    super(x, y, width, height);
  }
}
