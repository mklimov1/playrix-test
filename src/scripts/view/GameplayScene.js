import onChange from "on-change";
import Scene from "./Scene";
import createGameObjects from "./gameObjects";
import { addToStage, setProps } from "./utils";
import getScene1Model from "../model/scene1";

export default class GameplayScene extends Scene {
  constructor(node) {
    super(node);
    this.init();
  }

  addObjectsToScene() {
    const gameObjects = this.getGameObjects();
    const {
      bg,
      stairs,
      stage,
      logo,
      hammerIcon,
      persona,
      stairIcons,
      okBtn,
      sofa,
      table,
      globe,
      bookStand,
      plants,
      overlap,
      packshotBanner,
      continueBtn,
    } = gameObjects;

    okBtn.setTarget(stairIcons[0]);

    [
      hammerIcon,
      ...stairIcons,
      okBtn,
      overlap,
      packshotBanner,
    ].forEach((element) => {
      setProps(element, { visible: false });
    });

    addToStage(
      stage,
      bg,
      sofa,
      globe,
      table,
      bookStand,
      plants[1],
      plants[2],
      persona,
      stairs,
      plants[0],
      hammerIcon,
      ...stairIcons,
      okBtn,
      overlap,
      packshotBanner,
      continueBtn,
      logo
    );
  }

  init() {
    this.watchedObject = onChange(
      getScene1Model(),
      (path, value, previousValue, applyData) => {
        console.log(path);
        console.log(value);
        console.log(previousValue);
        console.log(applyData);
      }
    );
    this.addGameObjects(createGameObjects(this.application));
  }

  start() {
    const go = this.getGameObjects();

    this.resizeApplication();
    this.addObjectsToScene();

    this.render();
  }

  showHammerIcon() {

  }

  render() {
    // this.showPackshot();
  }

  initialScene() {

  }

  showPackshot() {
    const go = this.getGameObjects();
    const { overlap, packshotBanner } = go;

    [overlap, packshotBanner].forEach((element) => {
      setProps(element, { visible: true });
      // element.show();
    });
  }
}
