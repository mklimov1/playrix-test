import platforms from "./platforms";

export default (name) => {
  const lcPlatform = name.toLowerCase();

  if (!platforms[lcPlatform]) {
    return platforms.default;
  }
  return platforms[lcPlatform];
};
