import Application from "./gameObjects/Application";

const resizeApplication = (application, width, height) => {
  application.renderer.resize(width, height);
};
const getNodeSize = (node) => {
  const { clientWidth: width, clientHeight: height } = node;
  return { width, height };
};

export default class Scene {
  constructor(wrapper, applicationOptions = {}) {
    this.wrapper = wrapper;
    this.application = new Application({
      backgroundColor: 0x000000,
      backgroundAlpha: 1,
      ...applicationOptions,
    });
    this.gameNode = document.createElement(`div`);
    this.gameNode.classList.add(`game-wrapper`);
    this.gameNode.appendChild(this.application.view);
    this.wrapper.appendChild(this.gameNode);

    this._gameObjects = {};
  }

  addGameObjects(objects) {
    this._gameObjects = { ...this._gameObjects, ...objects };
  }

  getGameObjects() {
    return this._gameObjects;
  }

  resizeApplication() {
    const { width, height } = getNodeSize(this.gameNode);
    resizeApplication(this.application, width, height);
  }

  resize() {
    const { application } = this;

    if (application) {
      const { stage } = application;
      const { children } = stage;

      this.resizeApplication();
      children.forEach((child) => {
        child.redraw();
      });
    }

    console.log(`scene resized`);
  }
}
