export function random(number) {
  return Math.floor(Math.random() * number);
}

export function countPosition(canvasWidth, elementWidth) {
  return Math.max(Math.round((canvasWidth - elementWidth) / 2), 0);
}
