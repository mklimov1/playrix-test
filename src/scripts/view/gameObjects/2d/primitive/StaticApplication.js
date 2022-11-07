import Application from "./Application";

export default class StaticApplication extends Application {
  constructor(customOptions = {}) {
    const options = {
      ...customOptions,
      autoStart: false,
    };

    super(options);

    this.isStatic = true;
  }
}
