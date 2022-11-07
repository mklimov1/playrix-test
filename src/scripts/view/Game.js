import "../../styles/game-styles.sass";
import createGameObjects from "./gameObjects";

export default class Game {
  constructor(wrapperEl, assets, storeCallback = () => {}) {
    this.wrapper = wrapperEl;
    this.assets = assets;
    this.storeCB = storeCallback;

    this.init();
  }

  init() {
    const node = document.createElement(`div`);

    node.classList.add(`game-wrapper`);
    console.log(this.wrapper);
    this.wrapper.appendChild(node);
    this.gameObjects = { ...createGameObjects(this.assets) };
  }

  start() {}

  resize() {w}
}
