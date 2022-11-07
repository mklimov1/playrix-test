export default class ParticleContainer extends PIXI.ParticleContainer {
  constructor(children, width, height, properties = {}) {
    const props = {
      origin: 0.5,
      ...properties,
    };
    const hasChildren = children && children.length > 0;
    const options = {
      vertices: true,
      position: true,
      rotation: true,
      uvs: true,
      tint: true,
    };

    let maxParticles;

    if (hasChildren) {
      maxParticles = children.length;
    }

    super(maxParticles, options, maxParticles, false);

    if (hasChildren) this.addChild(...children);

    this.drawingSize = {
      width: width || this.getBounds().width,
      height: height || this.getBounds().height,
    };

    this.set(props);
  }
}
