const getSource = (path) => {
  const module = require(`./${path}`);
  const src = module.default;
  return src;
};
const createImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

export default {
  image: createImage(getSource(`image.jpg`)),
};
