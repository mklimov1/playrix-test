import anime from "animejs";

export const animate = (options) => {
  anime(options);
};

export const show = (options) => {
  const { value = 1, ...opts } = options;

  animate({
    value,
    ...opts,
  });
};

export const hide = (options) => {
  const { value = 0, ...opts } = options;

  animate({
    value,
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
    easing: `easeInOutQuad`,
    direction: `alternate`,
    loop: true,
    ...opts,
  });
};
