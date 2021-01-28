export default class Tetromino {
  constructor(matrix, color) {
    this.matrix = matrix;
    this.color = color;
  }

  setMatrix(matrix) {
    this.matrix = matrix;
  }
}
