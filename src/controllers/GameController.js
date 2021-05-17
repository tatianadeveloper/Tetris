import Collision from '@core/Collision';
import { COLOR_EMPTY } from '@core/constants';

export default class GameController {
  constructor(gameModel, infoView, gameView, tetrominoView) {
    this.gameModel = gameModel;
    this.infoView = infoView;
    this.gameView = gameView;
    this.tetrominoView = tetrominoView;
    this.dropStart;
    this.isRunning = false;
    this.initGame();
    this.bind();
  }

  bind() {
    this.infoView.onClickNewGame(this.onClickNewGameHandler);
    this.infoView.onKeyDown(this.onKeydownHandler);
    this.infoView.onClickPause(this.onClickPauseHandler);
  }

  init() {
    this.isRunning = true;
    this.gameModel.init();
    this.initGame();
    this.gameModel.generateNextTetromino();
    this.drawTetromino();
    this.updateInfo();
  }

  initGame() {
    this.gameView.init();
    this.gameView.drawBoard(this.gameModel.board);
    this.tetrominoView.init();
  }

  gameLoop() {
    if (!this.gameModel.gameOver) {
      const now = Date.now();
      const delay = now - this.dropStart;
      if (delay > this.gameModel.speed) {
        this.moveTetrominoHandler('ArrowDown');
        this.dropStart = Date.now();
      }
      this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      this.cancelAnimation();
    }
  }

  drawTetromino() {
    this.gameModel.getTetromino();
    this.gameView.drawTetromino(this.gameModel);
    this.tetrominoView.clear();
    this.tetrominoView.drawTetromino({
      positionX: 0,
      positionY: 0,
      tetromino: this.gameModel.nextTetromino,
    });
  }

  updateInfo(numberLines = 0) {
    if (numberLines > 0) {
      this.gameModel.updateInfo(numberLines);
    }
    this.infoView.updateInfo(this.gameModel);
  }

  moveTetromino(newData) {
    this.gameView.drawTetromino(this.gameModel, COLOR_EMPTY);
    this.gameModel.moveTetromino(newData);
    this.gameView.drawTetromino(this.gameModel);
  }

  moveTetrominoHandler(key) {
    const collision = new Collision(this.gameModel, key);
    if (collision.canMove()) {
      this.moveTetromino(collision);
    } else if (key === 'ArrowDown' && this.gameModel.positionY === 0) {
      this.stopGame();
    } else if (key === 'ArrowDown') {
      this.stopTetromino();
    }
  }

  playNewGame() {
    this.init();
    this.infoView.playGame();
    this.dropStart = Date.now();
    this.gameLoop();
  }

  stopGame() {
    this.infoView.stopGame();
    this.gameModel.stopGame();
    cancelAnimationFrame(this.animationFrameId);
    this.initGame();
    this.gameView.displayGameOver();
  }

  stopTetromino() {
    this.gameModel.board.addTetromino(this.gameModel);
    const numberLines = this.gameModel.board.removeFullLines();
    if (numberLines > 0) {
      this.gameView.drawBoard(this.gameModel.board);
      this.updateInfo(numberLines);
    }
    if (!this.gameModel.gameOver) {
      this.drawTetromino();
    }
  }

  onKeydownHandler = (key) => {
    this.moveTetrominoHandler(key);
  };

  onClickNewGameHandler = () => {
    let play = true;
    if (this.gameModel.score > 0) {
      const result = confirm('Are you sure you want to start new game?');
      play = result;
    }
    if (play) {
      this.cancelAnimation();
      this.playNewGame();
    }
  };

  onClickPauseHandler = () => {
    if (this.isRunning) {
      this.isRunning = false;
      this.cancelAnimation();
      this.infoView.pauseGame();
    } else {
      this.isRunning = true;
      this.infoView.playGame();
      this.dropStart = Date.now();
      this.gameLoop();
    }
  };

  cancelAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
