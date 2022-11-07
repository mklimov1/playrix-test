export default class AbstractEllipse extends PIXI.Ellipse {
  constructor(width, height, originX, originY) {
    const origin = {
      x: typeof originX === `number` ? originX : 0.5,
      y: typeof originY === `number` ? originX : 0.5,
    };
    const size = {
      width: width * 0.5,
      height: height * 0.5,
    };
    const x = -size.width * (origin.x - 0.5);
    const y = -size.height * (origin.y - 0.5);

    super(x, y, size.width, size.height);
  }
}
