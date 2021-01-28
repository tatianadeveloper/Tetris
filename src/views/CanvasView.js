import { SIZE, BORDER_COLOR } from '@core/constants';
import { countPosition } from '@core/utils';

export default class CanvasView {
  static gameOverText = 'GAME OVER';

  constructor(column, row, canvas) {
    this.column = column;
    this.row = row;
    this.size = SIZE;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.init();
  }

  init() {
    this.canvas.width = this.column * this.size;
    this.canvas.height = this.row * this.size;
  }

  drawPoint(x, y, color, borderColor = BORDER_COLOR, borderWidth = 0.5) {
    this.context.fillStyle = color;
    this.context.fillRect(x * this.size, y * this.size, this.size, this.size);
    this.context.strokeStyle = borderColor;
    this.context.lineWidth = borderWidth;
    this.context.strokeRect(
      x * this.size,
      y * this.size,
      this.size - borderWidth,
      this.size - borderWidth
    );
  }

  drawBoard(board) {
    board.cells.map((currentRow, row) => {
      currentRow.map((value, column) => {
        this.drawPoint(column, row, value);
      });
    });
  }

  drawTetromino({ positionX, positionY, tetromino }, color) {
    tetromino.matrix.map((row, rowIndex) => {
      row.map((value, index) => {
        if (value > 0) {
          this.drawPoint(
            positionX + index,
            positionY + rowIndex,
            color || tetromino.color
          );
        }
      });
    });
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  displayGameOver() {
    this.clear();
    this.context.font = 'bold  40px Roboto, sans-serif';
    this.context.shadowOffsetX = 3;
    this.context.shadowOffsetY = 3;
    this.context.shadowColor = '#b7bbbe';
    this.context.shadowBlur = 4;
    this.context.fillStyle = 'grey';
    const textOver = CanvasView.gameOverText;
    const positionX = countPosition(
      this.canvas.width,
      this.context.measureText(textOver).width
    );
    const positionY = Math.round(this.canvas.height / 2);
    this.context.fillText(textOver, positionX, positionY);
  }
}
