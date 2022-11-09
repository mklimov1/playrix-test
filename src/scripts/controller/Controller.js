/* eslint-disable class-methods-use-this */

import PROJECT_DATA from "../model/project";
import loadImages from "../engine/loaders/loadImages";
import getPlatform from "./platforms/getPlatform";
import imageSources from "../../assets/images";
import Game from "../view/Game";

export default class Controller {
  constructor(node) {
    this.node = node;
  }

  async init() {
    const platform = getPlatform(PROJECT_DATA.platform);
    const assets = await this.loadAssets();
    const game = new Game(this.node, assets);

    console.log(assets);
    game.start();
    window.addEventListener(`resize`, () => game.resize());
  }

  async loadAssets() {
    return loadImages(imageSources);
  }

  hideLoadingAnimation() {}
}
