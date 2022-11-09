/* eslint-disable no-param-reassign */
import {
  drawBackground,
  drawContinueButton,
  drawDecoration,
  drawHammerIcon,
  drawLogo,
  drawOkButton,
  drawOverlap,
  drawPackshotBanner,
  drawPersona,
  drawStairIcon,
  drawStairs,
} from "../draw";
import Application from "./Application";
import Button from "./Button";
import Persona from "./Persona";
import Rectangle from "./Rectangle";
import Sprite from "./Sprite";
import StairIcon from "./StairIcon";
import Stairs from "./Stairs";
import TargetButton from "./TargetButton";

const { Texture } = PIXI;

const setRedrawFunction = (target, fn, ...dependencies) => {
  target.redraw = () => {
    fn(target, ...dependencies);
  };
};

export default (application) => {
  const textures = {
    bg: Texture.from(`bg`),
    continue: Texture.from(`continue`),
    ok: Texture.from(`ok`),
    logo: Texture.from(`logo`),
    persona: Texture.from(`persona`),
    packshotBanner: Texture.from(`packshot-banner`),
    stairs: [
      Texture.from(`stairs/1`),
      Texture.from(`stairs/2`),
      Texture.from(`stairs/3`),
      Texture.from(`stairs/4`),
    ],
    icons: {
      hammer: Texture.from(`hammer-icon`),
      stairs: [
        Texture.from(`icon-stairs/1`),
        Texture.from(`icon-stairs/2`),
        Texture.from(`icon-stairs/3`),
      ],
    },
    sofa: Texture.from(`decorations/sofa`),
    globe: Texture.from(`decorations/globe`),
    bookStand: Texture.from(`decorations/book-stand`),
    table: Texture.from(`decorations/table`),
    plant: [Texture.from(`decorations/plant1`), Texture.from(`decorations/plant2`)],
  };
  const { stage, view: canvas } = application;
  const logo = new Sprite(textures.logo);
  const bg = new Sprite(textures.bg);
  const stairs = new Stairs(textures.stairs);
  const hammerIcon = new Button(textures.icons.hammer);
  const continueBtn = new Button(textures.continue);
  const okBtn = new TargetButton(textures.ok);
  const persona = new Persona(textures.persona);
  const packshotBanner = new Sprite(textures.packshotBanner);
  const overlap = new Rectangle(1000, 1000, [0x000000, 0.6]);
  const stairIcons = textures.icons.stairs.map((t, index) => new StairIcon(t, { id: index }));
  const sofa = new Sprite(textures.sofa, { alias: `sofa` });
  const table = new Sprite(textures.table, { alias: `table` });
  const globe = new Sprite(textures.globe, { alias: `globe` });
  const bookStand = new Sprite(textures.bookStand, { alias: `bookStand` });
  const plants = [
    new Sprite(textures.plant[0], { alias: `plant0` }),
    new Sprite(textures.plant[1], { alias: `plant1` }),
    new Sprite(textures.plant[1], { alias: `plant2` }),
  ];

  setRedrawFunction(okBtn, drawOkButton, canvas, stairIcons);
  setRedrawFunction(bg, drawBackground, canvas);
  setRedrawFunction(overlap, drawOverlap, canvas);
  setRedrawFunction(stairs, drawStairs, bg);
  setRedrawFunction(logo, drawLogo, canvas);
  setRedrawFunction(hammerIcon, drawHammerIcon, stairs, canvas);
  setRedrawFunction(persona, drawPersona, bg, canvas);
  setRedrawFunction(packshotBanner, drawPackshotBanner, canvas);
  setRedrawFunction(continueBtn, drawContinueButton, canvas);
  stairIcons.forEach((icon) => {
    setRedrawFunction(icon, drawStairIcon, canvas);
  });
  [
    bookStand,
    globe,
    table,
    sofa,
    ...plants,
  ].forEach((element) => {
    setRedrawFunction(element, drawDecoration, bg, canvas);
  });

  return {
    application,
    stage,
    canvas,
    bg,
    logo,
    stairs,
    hammerIcon,
    persona,
    packshotBanner,
    overlap,
    continueBtn,
    okBtn,
    stairIcons,
    bookStand,
    globe,
    table,
    sofa,
    plants,
  };
};
