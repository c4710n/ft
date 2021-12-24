import { Tween } from '../systems/TweenSystem/TWEEN';
export function fadeIn(displayObject) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  return new Tween(displayObject).to({
    alpha: 1
  }, duration);
}
export function fadeOut(displayObject) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  return new Tween(displayObject).to({
    alpha: 0
  }, duration);
}
export * from '../systems/TweenSystem/TWEEN';
//# sourceMappingURL=index.js.map