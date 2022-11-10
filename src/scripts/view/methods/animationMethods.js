import anime from "animejs";

export const animate = (options) => {
  anime({
    easing: `easeInOutQuad`,
    ...options,
  });
};

export const stopAnimations = (...targets) => {
  const getTargetObjects = (target) => [target, target.scale, target.skew];
  const objects = [];

  targets.forEach((target) => {
    objects.push(...getTargetObjects(target));
  });

  anime.remove(objects);
};

export const show = (options) => {
  const { value = 1, ...opts } = options;

  animate({
    alpha: [0, value],
    ...opts,
  });
};

export const hide = (options) => {
  const { value = 0, ...opts } = options;

  animate({
    alpha: (target) => [target.alpha, value],
    ...opts,
  });
};

export const scaleAnimation = (options) => {
  const { targets, value, ...opts } = options;
  const scaleObjects = Array.isArray(targets) ? targets.map((t) => t.scale) : targets.scale;

  animate({
    targets: scaleObjects,
    x: value,
    y: value,
    ...opts,
  });
};

export const idleAnimation = (options) => {
  const { targets, ...opts } = options;
  const scaleObjects = Array.isArray(targets) ? targets.map((t) => t.scale) : targets.scale;

  animate({
    targets: scaleObjects,
    direction: `alternate`,
    loop: true,
    ...opts,
  });
};
