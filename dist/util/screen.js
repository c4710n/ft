import app from '../app';
var LIMIT_BIG = 1392 / 750;
var LIMIT_MIDDLE = 1150 / 750;

function getRatio() {
  var _app$systems$scale$bo = app.systems.scale.bounds,
      height = _app$systems$scale$bo.height,
      width = _app$systems$scale$bo.width;
  var ratio = height / width;
  return ratio;
}

function isBig() {
  var ratio = getRatio();
  return ratio >= LIMIT_BIG;
}

function isMiddle() {
  var ratio = getRatio();
  return ratio < LIMIT_BIG && ratio >= LIMIT_MIDDLE;
}

function isSmall() {
  var ratio = getRatio();
  return ratio < LIMIT_MIDDLE;
}

export default {
  isBig: isBig,
  isMiddle: isMiddle,
  isSmall: isSmall
};
//# sourceMappingURL=screen.js.map