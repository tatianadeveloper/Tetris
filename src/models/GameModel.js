import { countPosition } from '@core/utils';
import getScore from '@core/Score';
import { START_SPEED, LEVEL_SPEED } from '@core/constants';

export default class GameModel {
  constructor(board, tetrominos) {
    this.board = board;
    this.tetrominos = tetrominos;
    this.init();
  }

  init() {
    this.tetromino = null;
    this.board.init();
    this.positionX = 0;
    this.positionY = 0;
    this.nextTetromino = null;
    this.score = 0;
    this.level = 0;
    this.lines = 0;
    this.speed = START_SPEED;
    this.gameOver = false;
  }

  getTetromino() {
    this.positionX = countPosition(
      this.board.column,
      this.nextTetromino.matrix[0].length
    );
    this.positionY = 0;
    this.tetromino = this.nextTetromino;
    if (!this.gameOver) {
      this.generateNextTetromino();
    }
  }

  moveTetromino({ positionX, positionY, matrix }) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.tetromino.setMatrix(matrix);
  }

  generateNextTetromino() {
    this.nextTetromino = this.tetrominos.getRandom();
  }

  stopGame() {
    this.gameOver = true;
  }

  updateInfo(lines) {
    this.countLevel();
    this.countScore(lines);
    this.addLines(lines);
  }

  countLevel() {
    this.level = Math.floor(this.lines / 10);
    this.speed = START_SPEED - this.level * LEVEL_SPEED;
  }

  countScore(lines) {
    this.score += getScore(lines, this.level);
  }

  addLines(lines) {
    this.lines += lines;
  }
}
