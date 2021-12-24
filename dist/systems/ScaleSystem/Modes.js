import ORIENTATION from './ORIENTATION';

function getGameOrientation(width, height) {
  return width >= height ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;
}

function getViewportOrientation(width, height) {
  return width >= height ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;
}

function isOrientationMatched(width, height, viewportCSSWidth, viewportCSSHeight) {
  return getGameOrientation(width, height) === getViewportOrientation(viewportCSSWidth, viewportCSSHeight);
}

function generate(width, height, viewportCSSWidth, viewportCSSHeight, calcFunction) {
  var shouldRotate = !isOrientationMatched(width, height, viewportCSSWidth, viewportCSSHeight);

  if (shouldRotate) {
    ;
    var _ref = [viewportCSSHeight, viewportCSSWidth];
    viewportCSSWidth = _ref[0];
    viewportCSSHeight = _ref[1];
  }

  var position = calcFunction(width, height, viewportCSSWidth, viewportCSSHeight);
  var scale = position.scale,
      offsetCSSX = position.offsetCSSX,
      offsetCSSY = position.offsetCSSY;
  var boundsLeft;
  var boundsRight;
  var boundsTop;
  var boundsBottom;
  var boundsWidth;
  var boundsHeight;

  if (offsetCSSX >= 0) {
    boundsLeft = 0;
    boundsRight = width;
    boundsWidth = width;
  } else {
    boundsLeft = -offsetCSSX / scale;
    boundsRight = (viewportCSSWidth - offsetCSSX) / scale;
    boundsWidth = viewportCSSWidth / scale;
  }

  if (offsetCSSY >= 0) {
    boundsTop = 0;
    boundsBottom = height;
    boundsHeight = height;
  } else {
    boundsTop = -offsetCSSY / scale;
    boundsBottom = (viewportCSSHeight - offsetCSSY) / scale;
    boundsHeight = viewportCSSHeight / scale;
  }

  var bounds = {
    left: boundsLeft,
    right: boundsRight,
    top: boundsTop,
    bottom: boundsBottom,
    width: boundsWidth,
    height: boundsHeight
  };
  var viewport = {
    cssWidth: viewportCSSWidth,
    cssHeight: viewportCSSHeight
  };
  return {
    shouldRotate: shouldRotate,
    position: position,
    bounds: bounds,
    viewport: viewport
  };
}

function calcCover(width, height, viewportCSSWidth, viewportCSSHeight) {
  var scale = Math.max(viewportCSSWidth / width, viewportCSSHeight / height);
  var offsetCSSX = (viewportCSSWidth - width * scale) / 2;
  var offsetCSSY = (viewportCSSHeight - height * scale) / 2;
  return {
    scale: scale,
    offsetCSSX: offsetCSSX,
    offsetCSSY: offsetCSSY
  };
}

function calcContain(width, height, viewportCSSWidth, viewportCSSHeight) {
  var scale = Math.min(viewportCSSWidth / width, viewportCSSHeight / height);
  var offsetCSSX = (viewportCSSWidth - width * scale) / 2;
  var offsetCSSY = (viewportCSSHeight - height * scale) / 2;
  return {
    scale: scale,
    offsetCSSX: offsetCSSX,
    offsetCSSY: offsetCSSY
  };
}

export function COVER(width, height, viewportCSSWidth, viewportCSSHeight) {
  return generate(width, height, viewportCSSWidth, viewportCSSHeight, calcCover);
}
export function CONTAIN(width, height, viewportCSSWidth, viewportCSSHeight) {
  return generate(width, height, viewportCSSWidth, viewportCSSHeight, calcContain);
}
export default {
  COVER: COVER,
  CONTAIN: CONTAIN
};
//# sourceMappingURL=Modes.js.map