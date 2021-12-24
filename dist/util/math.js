export function clamp(x, min, max) {
  if (min > max) {
    throw new RangeError('`min` should be lower than `max`');
  }

  if (x < min) {
    return min;
  }

  if (x > max) {
    return max;
  }

  return x;
}
export default {
  clamp: clamp
};
//# sourceMappingURL=math.js.map