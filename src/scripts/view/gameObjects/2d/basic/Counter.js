import Container from "../primitive/Container";
import Sprite from "../primitive/Sprite";
import Numbers from "./Numbers";

export default class Counter extends Container {
  constructor(boardTexture, numbersTextures) {
    const board = new Sprite(boardTexture);
    const counter = new Numbers(numbersTextures, 0, 0, 0.5, 0.5);
    const size = {
      width: board.getDrawingSize().width,
      height: board.getDrawingSize().height,
    };

    super(size, [board, counter]);

    counter.set({
      x: -size.width * 0.2,
      y: -size.height * 0.01,
    });

    this.activeObjects = {
      board,
      counter,
      // slash,
      // max,
    };
  }

  updateCounter(number) {
    const { counter } = this.activeObjects;

    counter.setNumber(number, 300);
  }
}
