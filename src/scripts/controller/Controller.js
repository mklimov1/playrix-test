/* eslint-disable class-methods-use-this */

import loadImages from "../engine/loaders/loadImages";
import imageSources from "../../assets/images";
import Game from "./Game";

export default class Controller {
  constructor(node) {
    this.node = node;
  }

  async init() {
    const assets = await this.loadAssets();
    const game = new Game(this.node, assets);

    console.log(assets);
    this.game = game;
    game.start();
    window.addEventListener(`resize`, () => game.resize());
  }

  async loadAssets() {
    return loadImages(imageSources);
  }

  hideLoadingAnimation() {}
}
