/* eslint-disable no-param-reassign */
function setOrigin(target, originX, originY) {
  const localBounds = target.getLocalBounds();
  const origin = {
    x: originX,
    y: typeof originY === `number` ? originY : originX,
  };
  const pivot = {};

  pivot.x = localBounds.width * originX + localBounds.x;
  pivot.y = localBounds.height * originY + localBounds.y;
  target.pivot.set(pivot.x, pivot.y);
  target.origin = {
    x: origin.x,
    y: origin.y,
  };
}

function setProp(target, key, value) {
  const type = typeof value;
  switch (key) {
    case `anchor`:
    case `scale`:
    case `skew`:
    case `pivot`:
      switch (typeof value) {
        case `object`:

          if (Array.isArray(value)) {
            target[key].set(...value);
          } else {
            target[key].set(
              value.x !== undefined ? +value.x : target[key].x,
              value.y !== undefined ? +value.y : target[key].y
            );
          }
          break;

        default:
          target[key].set(+value, +value);
          break;
      }
      break;

    case `baseSize`:
      switch (typeof value) {
        case `object`:

          if (Array.isArray(value)) {
            [target[key].width, target[key].height] = value;
          } else {
            target[key].set(
              value.width !== undefined ? +value.width : target[key].width,
              value.height !== undefined ? +value.height : target[key].height
            );
          }
          break;

        default:
          target[key].set(+value, +value);
          break;
      }
      break;

    case `origin`:
      if (type === `number` || !Number.isNaN(+value)) {
        setOrigin(target, +value, +value);
      } else if (type === `object`) {
        if (Array.isArray(value)) {
          setOrigin(target, ...value);
        } else {
          setOrigin(
            target,
            value.x !== undefined ? +value.x : target[key].x,
            value.y !== undefined ? +value.y : target[key].y
          );
        }
      }
      break;

    default:
      target[key] = value;
      break;
  }
}

export function setProps(target, props, value) {
  const type = typeof props;

  if (type === `string` || type === `number`) {
    setProp(target, props, value);
  } else if (type === `object`) {
    const keys = Object.keys(props);

    if (keys.length > 1) {
      keys.forEach((key) => {
        setProp(target, key, props[key]);
      });
    } else {
      setProp(target, keys[0], props[keys[0]]);
    }
  }
}

export function scaleToWidth(target, width) {
  target.scale.x = width / target.baseSize.width;
  target.scale.y = target.scale.x;
}

export function scaleToHeight(target, height) {
  target.scale.y = height / target.baseSize.height;
  target.scale.x = target.scale.y;
}

export function getScaledWidth(target) {
  return target.baseSize.width * target.scale.x;
}

export function getScaledHeight(target) {
  return target.baseSize.height * target.scale.y;
}

export const addToStage = (stage, ...objects) => {
  stage.addChild(...objects);

  objects.forEach((element) => {
    element.redraw();
  });
};
