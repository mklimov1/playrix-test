import Container from "./Container";

export default class Icon extends Container {
  constructor(children, props = {}) {
    const wrapper = new Container(children);
    super(wrapper, {
      cursor: `pointer`,
      interactive: true,
      ...props,
    });
    this.wrapper = wrapper;
  }
}
