import Scene from "./Scene";
import createGameObjects from "./gameObjects";
import { addToStage, setProps } from "./methods/gameObjectsMathods";

export default class GameplayScene extends Scene {
  constructor(node) {
    super(node);
    this.init();
  }

  addObjectsToScene() {
    const gameObjects = this.getGameObjects();
    const {
      bg,
      stair,
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
      continueBtn,
      overlap,
      packshotBanner,
      packshotBtn,
    } = gameObjects;

    okBtn.setTarget(stairIcons[0]);

    [
      hammerIcon,
      ...stairIcons,
      okBtn,
      overlap,
      packshotBanner,
      packshotBtn,
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
      stair,
      plants[0],
      hammerIcon,
      ...stairIcons,
      okBtn,
      continueBtn,
      overlap,
      packshotBanner,
      packshotBtn,
      logo
    );
  }

  init() {
    this.addGameObjects(createGameObjects(this.application));
  }

  start() {
    this.resizeApplication();
    this.addObjectsToScene();
  }

  showHammerIcon() {
    const { hammerIcon } = this.getGameObjects();

    setProps(hammerIcon, { visible: true });
    hammerIcon.show();
    hammerIcon.verticalBounce();
  }

  hideHammerIcon() {
    const { hammerIcon } = this.getGameObjects();
    hammerIcon.stopAnimations();
    hammerIcon.hide();
  }

  showStairIcons(cb) {
    const { stairIcons } = this.getGameObjects();

    stairIcons.forEach((icon, i) => {
      icon.on(`pointertap`, () => { cb(icon.id, icon); });
      setTimeout(() => {
        icon.show();
      }, i * 100);
    });
  }

  hideStairIcons() {
    const { stairIcons } = this.getGameObjects();

    stairIcons.forEach((icon, i) => {
      icon.off(`pointertap`);
      setTimeout(() => {
        icon.hide();
      }, i * 50);
    });
  }

  renderStair(state, value, duration = 300) {
    const { stair } = this.getGameObjects();
    if (state === `id`) {
      stair.showItem(value, duration);
    }
  }

  renderHammerIcon(state, value, callback) {
    const { hammerIcon } = this.getGameObjects();

    if (state === `isActive`) {
      if (value) {
        hammerIcon.once(`pointertap`, callback);
        this.showHammerIcon(callback);
      } else {
        hammerIcon.off(`pointertap`);
        this.hideHammerIcon();
      }
    }
  }

  renderContinueBtn(state, value, clickHandler) {
    const { continueBtn } = this.getGameObjects();
    const stateMap = {
      isActive: () => {
        if (value) {
          continueBtn.on(`pointertap`, clickHandler);
          continueBtn.show();
        } else {
          continueBtn.off(`pointertap`);
          continueBtn.hide();
        }
      },
      isAnimationActive: () => {
        if (value) {
          continueBtn.scaleBounce();
        }
      },
    };

    stateMap[state]();
  }

  renderOkBtn(state, value, callback) {
    const { okBtn } = this.getGameObjects();
    const stateMap = {
      isActive: () => {
        if (value) {
          okBtn.on(`pointertap`, callback);
          okBtn.show();
        } else {
          okBtn.off(`pointertap`);
          okBtn.hide();
        }
      },
      target: () => {
        okBtn.setTarget(value);
        okBtn.updatePosition();
      },
    };

    stateMap[state]();
  }

  renderStairIcons(state, value, callback) {
    const { stairIcons } = this.getGameObjects();
    const stateMap = {
      isActive: () => {
        if (value) {
          this.showStairIcons(callback);
        } else {
          this.hideStairIcons();
        }
      },
      currentIconId: () => {
        if (stairIcons[value]) {
          stairIcons[value].select();
        }
      },
      prevIconId: () => {
        if (stairIcons[value]) {
          stairIcons[value].unselect();
        }
      },
    };

    stateMap[state]();
  }

  renderPersona(state, value) {
    const { persona } = this.getGameObjects();
    const stateMap = {
      isAnimationActive: () => {
        if (value) {
          persona.idleAnimation();
        }
      },
    };

    stateMap[state]();
  }

  showPackshot(clickHandler) {
    const go = this.getGameObjects();
    const { overlap, packshotBanner, packshotBtn } = go;

    [overlap, packshotBanner].forEach((element) => {
      setProps(element, { visible: true });
      element.show();
    });

    setTimeout(() => {
      packshotBtn.on(`pointertap`, clickHandler);
      setProps(packshotBtn, { visible: true });
      packshotBtn.show();

      setTimeout(() => {
        packshotBtn.scaleBounce();
      }, 700);
    }, 300);
  }
}
