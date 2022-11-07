const path = require(`path`);
const src = path.resolve(__dirname, `./../src`);
const dist = path.resolve(__dirname, `./../dist`);

module.exports = {
  src,
  dist,
  engine2d: path.join(src, `scripts/engine/pixi.min.js`),
};
