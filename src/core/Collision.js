export default class Collision {
  constructor({ positionX, positionY, tetromino, board }, key) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.matrix = tetromino.matrix;
    this.board = board;
    this.key = key;
  }

  canMove() {
    this.moveHandler();
    return this.matrix.every((row, y) => {
      return row.every((value, x) => {
        if (value == 0) return true;

        const pointX = x + this.positionX;
        const pointY = y + this.positionY;

        return this.board.isEmptyPoint(pointX, pointY);
      });
    });
  }

  moveX(dx) {
    this.positionX = this.positionX + dx;
  }

  moveY(dy) {
    this.positionY = this.positionY + dy;
  }

  rotate() {
    this.matrix = this.matrix[0].map((_, column) =>
      this.matrix.map((row) => row[column]).reverse()
    );
  }

  moveHandler() {
    switch (this.key) {
      case 'ArrowDown':
        this.moveY(1);
        break;
      case 'ArrowLeft':
        this.moveX(-1);
        break;
      case 'ArrowRight':
        this.moveX(1);
        break;
      case 'ArrowUp':
        this.rotate();
        break;
      default:
        break;
    }
  }
}
