import "../../styles/game-styles.sass";
import GameplayScene from "./GameplayScene";

export default class Game {
  constructor(wrapperEl, assets, storeCallback = () => {}) {
    this.wrapper = wrapperEl;
    this.assets = assets;
    this.storeCB = storeCallback;
  }

  start() {
    this.scene = new GameplayScene(this.wrapper);
    this.scene.start();
  }

  resize() {
    this.scene.resize();
  }
}
