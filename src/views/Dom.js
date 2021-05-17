export default class Dom {
  static btnPause = document.getElementById('pause');
  static btnNewGame = document.getElementById('play');
  static score = document.getElementById('score');
  static lines = document.getElementById('lines');
  static level = document.getElementById('level');
  static plusScore = document.getElementById('plusscore');
  static gameOver = document.getElementById('gameover');
  static gameCanvas = document.getElementById('canvas');
  static infoCanvas = document.getElementById('tetromino');

  constructor() {
    this.keyDownHandler = null;
  }

  pauseGame() {
    Dom.btnPause.innerHTML = 'Continue';
    this.removeListenerKeyDown();
  }

  playGame() {
    Dom.btnPause.innerHTML = 'Pause';
    Dom.btnPause.style.visibility = 'visible';
    document.addEventListener('keydown', this.keyDownHandler, true);
  }

  stopGame() {
    Dom.btnPause.style.visibility = 'hidden';
    Dom.btnNewGame.focus();
    this.removeListenerKeyDown();
  }

  updateInfo({ score, lines, level, plusScore }) {
    Dom.score.innerText = score;
    Dom.lines.innerText = lines;
    Dom.level.innerText = level;
    // Dom.plusScore.innerText = `+${plusScore}!`;
  }

  onClickNewGame(handler) {
    Dom.btnNewGame.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        handler();
      },
      true
    );
  }

  onClickPause(handler) {
    Dom.btnPause.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        handler();
      },
      true
    );
  }

  onKeyDown(handler) {
    this.keyDownHandler = (event) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
      const { key } = event;
      if (keys.includes(key)) {
        event.preventDefault();
        handler(key);
      }
    };
    document.addEventListener('keydown', this.keyDownHandler, true);
  }

  removeListenerKeyDown(handler) {
    document.removeEventListener('keydown', this.keyDownHandler, true);
  }
}
