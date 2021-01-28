import GameModel from '@models/GameModel';
import GameController from '@controllers/GameController';
import CanvasView from '@views/CanvasView';
import Dom from '@views/Dom';
import Tetrominos from '@models/Tetrominos';
import Board from '@models/Board';

import { COLUMN, ROW, TETROMINO_SIZE } from '@core/constants';

import './style.css';

const board = new Board(COLUMN, ROW);
const tetrominos = new Tetrominos();
const gameModel = new GameModel(board, tetrominos);
const dom = new Dom();
const gameView = new CanvasView(board.column, board.row, Dom.gameCanvas);
const tetrominoView = new CanvasView(
  TETROMINO_SIZE,
  TETROMINO_SIZE,
  Dom.infoCanvas
);

window.onload = function () {
  const game = new GameController(gameModel, dom, gameView, tetrominoView);
};
