import { COLOR_EMPTY } from '@core/constants';

export default class Board {
  constructor(column, row) {
    this.column = column;
    this.row = row;
    this.cells = [];
    this.init();
  }

  static isFull = (value) => value != COLOR_EMPTY;

  init() {
    this.cells = Array(this.row)
      .fill(0)
      .map(() => this.newRow());
  }

  clearBoard() {
    this.cells.map((row) => row.fill(0));
  }

  newRow() {
    return Array(this.column).fill(COLOR_EMPTY);
  }

  addTetromino({ positionX, positionY, tetromino }) {
    tetromino.matrix.map((row, y) => {
      row.map((value, x) => {
        if (value > 0) {
          this.cells[positionY + y][positionX + x] = tetromino.color;
        }
      });
    });
  }

  filterBoard() {
    this.cells = this.cells.filter((row) => !row.every(Board.isFull));
  }

  addEmptyLines(linesNumber) {
    for (let i = 0; i < linesNumber; i++) {
      this.cells.unshift(this.newRow());
    }
  }

  removeFullLines() {
    this.filterBoard();
    const linesRemoved = this.numberRemovedLines();
    if (linesRemoved > 0) {
      this.addEmptyLines(linesRemoved);
    }
    return linesRemoved;
  }

  numberRemovedLines() {
    return this.row - this.cells.length;
  }

  isEmptyPoint(x, y) {
    return (
      x < this.column &&
      x >= 0 &&
      y < this.row &&
      this.cells[y][x] === COLOR_EMPTY
    );
  }
}
