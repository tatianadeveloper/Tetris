import Tetromino from '@models/tetromino';
import { tetrominoData } from '@core/tetrominoData';
import { random } from '@core/utils';

export default class Tetrominos {
  constructor() {
    this.tetrominos = [];
    this.init();
  }
  init() {
    this.addTetrominos();
  }

  get(number) {
    return this.tetrominos[number];
  }

  add(tetromino) {
    this.tetrominos.push(tetromino);
  }

  addTetrominos() {
    tetrominoData.map((data) => {
      const tetromino = new Tetromino();
      tetromino.matrix = data.matrix;
      tetromino.color = data.color;
      this.add(tetromino);
    });
  }

  getRandom() {
    const number = tetrominoData.length;
    return this.get(random(number));
  }
}
