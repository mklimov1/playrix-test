import "../../styles/game-styles.sass";
import onChange from "on-change";
import getSceneModel from "../model/gameplayScene";
import GameplayScene from "../view/GameplayScene";
import { toStore } from "./gameLibrary";

export default class Game {
  constructor(wrapperEl, assets, storeCallback = () => {}) {
    this.wrapper = wrapperEl;
    this.assets = assets;
    this.storeCB = storeCallback;
  }

  start() {
    const sceneModel = getSceneModel();
    const scene = new GameplayScene(this.wrapper);
    const watchedObject = onChange(
      sceneModel,
      (path, val) => {
        const parsedPath = path.split(`.`);
        const [item, state] = parsedPath;
        const sceneMap = {
          hammerIcon: {
            isActive: (value) => {
              scene.renderHammerIcon(`isActive`, value, () => {
                watchedObject.hammerIcon.isActive = false;
                watchedObject.stairIcons.isActive = true;
              });
            },
          },
          stairIcons: {
            isActive(value) {
              scene.renderStairIcons(`isActive`, value, (id, icon) => {
                const current = watchedObject.stairIcons.currentIconId;

                if (id !== current) {
                  watchedObject.stairIcons.prevIconId = current;
                  watchedObject.stairIcons.currentIconId = id;
                }

                watchedObject.okBtn.target = icon;

                if (!watchedObject.okBtn.isActive) {
                  watchedObject.okBtn.isActive = true;
                }
              });
            },
            currentIconId(value) {
              scene.renderStairIcons(`currentIconId`, value);
              watchedObject.stair.id = value;
            },
            prevIconId(value) {
              scene.renderStairIcons(`prevIconId`, value);
            },
          },
          stair: {
            id: (value) => {
              scene.renderStair(`id`, value, 300);
            },
          },
          continueBtn: {
            isActive(value) {
              scene.renderContinueBtn(`isActive`, value, toStore);
            },
            isAnimationActive(value) {
              scene.renderContinueBtn(`isAnimationActive`, value);
            },
          },
          okBtn: {
            isActive(value) {
              scene.renderOkBtn(`isActive`, value, () => {
                watchedObject.stairIcons.isActive = false;
                watchedObject.okBtn.isActive = false;
                watchedObject.continueBtn.isActive = false;

                setTimeout(() => {
                  watchedObject.packshot.isActive = true;
                }, 300);
              });
            },
            target(value) {
              scene.renderOkBtn(`target`, value);
            },
          },
          packshot: {
            isActive(value) {
              if (value) {
                scene.showPackshot(toStore);
              }
            },
          },
          persona: {
            isAnimationActive(value) {
              scene.renderPersona(`isAnimationActive`, value);
            },
          },
        };

        sceneMap[item][state](val);
      }
    );

    this.scene = scene;
    scene.start();

    watchedObject.continueBtn.isActive = true;
    watchedObject.continueBtn.isAnimationActive = true;
    watchedObject.persona.isAnimationActive = true;
    setTimeout(() => {
      watchedObject.hammerIcon.isActive = true;
    }, 2000);
  }

  resize() {
    if (this.scene) { this.scene.resize(); }
  }
}
