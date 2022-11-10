import {
  scaleToHeight, setProps, getScaledWidth, scaleToWidth, getScaledHeight
} from "./gameObjectsMathods";

const ORIENTATION_RATIO = 1;
const isLandscape = (w, h, ratio = 1) => w >= h * ratio;
const getOrientation = (w, h, ratio = 1) => (isLandscape(w, h, ratio) ? `ls` : `po`);
const sortSizeByOrientation = (w, h, ratio = 1) => (isLandscape(w, h, ratio) ? [w, h] : [h, w]);

const setSize = (target, maxHeight, maxWidth) => {
  scaleToHeight(target, maxHeight);

  if (getScaledWidth(target) > maxWidth) scaleToWidth(target, maxWidth);

  return {
    width: getScaledWidth(target),
    height: getScaledHeight(target),
  };
};

export const drawBackground = (target, depend) => {
  const { height, width } = depend;
  const props = {
    y: height * 0.5,
  };

  scaleToHeight(target, height);

  if (getScaledWidth(target) < width) scaleToWidth(target, width);
  const tWidth = getScaledWidth(target);

  props.x = width - tWidth * 0.5;

  if (props.x + tWidth * 0.3 < width * 0.5) {
    props.x = width * 0.5 - tWidth * 0.3;
  }

  setProps(target, props);
};

export const drawStairs = (target, depend) => {
  const props = {
    scale: depend.scale.x,
    x: depend.x + depend.width * 0.405,
    y: depend.y + depend.height * 0.09,
  };

  setProps(target, props);
};

export const drawLogo = (target, depend) => {
  const { height, width } = depend;
  const [maxSize, minSize] = sortSizeByOrientation(width, height, ORIENTATION_RATIO);
  const size = setSize(target, maxSize * 0.09, minSize * 0.4);
  const props = {
    x: size.width * 0.6,
    y: size.height * 0.6,
  };

  setProps(target, props);
};

export const drawHammerIcon = (target, depend, canvas) => {
  const { height, width } = canvas;
  const [maxSize, minSize] = sortSizeByOrientation(width, height, ORIENTATION_RATIO);
  const props = {
    x: depend.x + depend.width * -0.12,
    y: depend.y + depend.height * -0.1,
  };

  setSize(target, maxSize * 0.2, minSize * 0.3);

  setProps(target, props);
};

export const drawPersona = (target, depend, canvas) => {
  const { height, width } = canvas;
  const orientation = getOrientation(width, height, ORIENTATION_RATIO);
  const positions = {
    ls: [0.05, -0.05],
    po: [0.21, -0.02],
  };
  const pos = positions[orientation];
  const props = {
    scale: depend.scale.x,
    x: depend.x + depend.width * pos[0],
    y: depend.y + depend.height * pos[1],
  };

  setProps(target, props);
};

export const drawPackshotBanner = (target, depend) => {
  const { height, width } = depend;
  const [maxSize, minSize] = sortSizeByOrientation(width, height, ORIENTATION_RATIO);
  const size = setSize(target, maxSize * 0.35, minSize * 0.95);
  const props = {
    x: width * 0.5,
    y: height * 0.5 + size.height * -0.2,
  };

  setProps(target, props);
};

export const drawOverlap = (target, canvas) => {
  const { height, width } = canvas;
  const { baseSize } = target;
  const props = {
    scale: {
      x: width / baseSize.width,
      y: height / baseSize.height,
    },
    x: width * 0.5,
    y: height * 0.5,
  };

  setProps(target, props);
};

export const drawContinueButton = (target, depend) => {
  const { width, height } = depend;
  const [maxSize, minSize] = sortSizeByOrientation(width, height, ORIENTATION_RATIO);
  const size = setSize(target, maxSize * 0.11, minSize * 0.6);
  const props = {
    x: width * 0.5,
    y: height - size.height * 0.7,
  };

  setProps(target, props);
};

export const drawStairIcon = (target, depend) => {
  const { width, height } = depend;
  const orientationScale = width / height;
  const [maxSize, minSize] = sortSizeByOrientation(width, height, ORIENTATION_RATIO);
  const size = setSize(target, maxSize * 0.13, minSize * 0.25);
  const pos = orientationScale > 0.75
    ? [width - size.width * 1.7, size.height * 0.7]
    : [width - size.width * 1.8, size.height * 1.35];
  const { id } = target;
  const offset = size.width * 1.06;
  const props = {
    x: pos[0] + offset * (id - 1),
    y: pos[1],
  };

  setProps(target, props);
};

const decorationPositions = {
  sofa: {
    ls: [-0.3, 0.3],
    po: [-0.3, 0.3],
  },
  table: {
    ls: [-0.27, 0.05],
    po: [-0.27, 0.05],
  },
  globe: {
    ls: [-0.4, -0.15],
    po: [-0.4, -0.15],
  },
  bookStand: {
    ls: [0.2, -0.35],
    po: [0.2, -0.35],
  },
  plant0: {
    ls: [0.4, 0.38],
    po: [0.4, 0.38],
  },
  plant1: {
    ls: [0.35, -0.1],
    po: [0.35, -0.1],
  },
  plant2: {
    ls: [-0.1, -0.4],
    po: [-0.1, -0.4],
  },
};

export const drawDecoration = (target, depend, canvas) => {
  const { width: cWidth, height: cHeight } = canvas;
  const { alias } = target;
  const orientation = getOrientation(cWidth, cHeight, ORIENTATION_RATIO);
  const position = decorationPositions[alias][orientation];
  const props = {
    scale: depend.scale.x,
    x: depend.x + getScaledWidth(depend) * position[0],
    y: depend.y + getScaledHeight(depend) * position[1],
  };

  setProps(target, props);
};

export const drawOkButton = (target, depend) => {
  const { width, height } = depend;
  const [maxSize, minSize] = sortSizeByOrientation(width, height, ORIENTATION_RATIO);

  setSize(target, maxSize * 0.09, minSize * 0.3);

  if (target.hasTarget()) {
    target.updatePosition();
  }
};

export const drawPackshotButton = (target, depend, canvas) => {
  const { width, height } = canvas;
  const [maxSize, minSize] = sortSizeByOrientation(width, height, ORIENTATION_RATIO);
  const size = setSize(target, maxSize * 0.11, minSize * 0.6);
  const dependBottomOffset = depend.y + getScaledHeight(depend) * 0.5;
  const props = {
    x: depend.x,
    y: dependBottomOffset + size.height * 0.8,
  };

  setProps(target, props);
};
