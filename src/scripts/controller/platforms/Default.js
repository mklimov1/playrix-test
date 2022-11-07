/* eslint-disable class-methods-use-this */
export default class Default {
  init() {}

  start(cb) {
    cb();
  }

  resize(cb) {
    window.addEventListener(`resize`, cb);
  }
}
