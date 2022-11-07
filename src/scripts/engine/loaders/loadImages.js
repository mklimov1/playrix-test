export default async (images) => {
  const promises = Object.entries(images).map(([name, img]) => new Promise((resolve) => {
    if (img.complete) {
      resolve([name, img]);
    } else {
      img.addEventListener(`load`, () => {
        resolve([name, img]);
      });
    }
  }));
  const arrayToObject = (prev, [name, img]) => ({ ...prev, [name]: img });

  const imgs = await Promise.all(promises).then((values) => values.reduce(arrayToObject, {}));

  return imgs
};
