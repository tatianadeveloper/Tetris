import { POINTS_DATA } from '@core/constants';

export default function getScore(lines, level) {
  const points = countPoints(lines);
  return points * level;
}

function countPoints(lines) {
  return POINTS_DATA[lines] || 0;
}
