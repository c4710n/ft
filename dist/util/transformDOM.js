import "core-js/modules/es.string.anchor.js";
import "core-js/modules/es.array.concat.js";
import app from '../app';
/**
 * Transform DOMElement's position and size according given DisplayObject.
 *
 * @param {DOMElement} dom the DOM to be transformed.
 * @param {DisplayObject} displayObject the display object which provides position and size.
 */

function transformDOM(dom, displayObject, layer) {
  var width = displayObject.width,
      height = displayObject.height,
      alpha = displayObject.worldAlpha,
      angle = displayObject.angle,
      visible = displayObject.visible;

  var _displayObject$getGlo = displayObject.getGlobalPosition(),
      $x = _displayObject$getGlo.x,
      $y = _displayObject$getGlo.y;

  var pivotX, pivotY;

  if (displayObject.anchor) {
    var _displayObject$anchor = displayObject.anchor,
        anchorX = _displayObject$anchor.x,
        anchorY = _displayObject$anchor.y;
    pivotX = width * anchorX;
    pivotY = height * anchorY;
  } else {
    pivotX = displayObject.pivot.x;
    pivotY = displayObject.pivot.y;
  }

  var stagePosition = app.stage.getGlobalPosition();
  var x = $x - stagePosition.x - pivotX;
  var y = $y - stagePosition.y - pivotY;
  dom.style.position = 'absolute';
  dom.style.display = visible ? '' : 'none';
  dom.style.width = "".concat(width, "px");
  dom.style.height = "".concat(height, "px");
  dom.style.left = "".concat(x, "px");
  dom.style.top = "".concat(y, "px");
  dom.style.zIndex = layer;
  dom.style.opacity = alpha;
  dom.style.transformOrigin = "".concat(pivotX, "px ").concat(pivotY, "px");
  dom.style.transform = "rotate(".concat(angle, "deg)");
}

export default transformDOM;
//# sourceMappingURL=transformDOM.js.map