const { Assets } = PIXI;
const getExtension = (filename) => filename.split(`.`).pop();
const loadImg = (name, src) => {
  Assets.add(name, src);
  return Assets.load(name);
};
const loaderMap = {
  json: loadImg,
  png: loadImg,
  jpg: loadImg,
};
export default async (sources) => {
  const promises = Object.entries(sources).map(([name, src]) => {
    const ext = getExtension(src);
    const load = loaderMap[ext];

    return load(name, src);
  });

  const resources = await Promise.all(promises).then((values) => values);

  return resources;
};
