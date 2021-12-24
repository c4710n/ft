function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.string.anchor.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { PIXI } from '../core';
var dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA+CAMAAABXyBiCAAAALVBMVEVHcEz////////////////////////////////////////////////////////NXt0CAAAADnRSTlMA6s6hkRr6RTdff3EJvuAfGLoAAAEnSURBVHja7dfbisUgDEBRk2jiNf//uUMhdChWe3IY5qnrsbArRagx3EtSWm2tSAof6hKR9cQjynOUCVRZr4DyNhLUBSzrlVA3UBZLsW6wKqW7DPQJyFz1y7uRiGIccF2R25yxmlGln09zu3xxnLqoB6jTF+QIm64TWzRJtFsvpU82pwSPqAaSq6tqMLgUtq46OzXZ15Fl5Mu6beAIPplt75yKbYGXDKQUXq/X62/kATYG+P98zZuRHjg7M7RDq//LaZB9Z+upftmhfnVIJlATvYePwbx+eV/PDqspLlVQqLsOYr6LDm3RGWy5B9OlDnvMECaN9QJGjESErL84zASuk6POMNzopHssrrn8eXMKLiN5vj6o4/pwkjhYT4xRepisr0atrq9GP5VpI3XLFWQCAAAAAElFTkSuQmCC';
/**
 * A simple spinner.
 *
 * @example
 * const spinner = FT.create(Spinner, { color: 0xff0000 })
 * container.addChild(spinner)
 */

var Spinner = /*#__PURE__*/function (_PIXI$Sprite) {
  _inherits(Spinner, _PIXI$Sprite);

  var _super = _createSuper(Spinner);

  /**
   * @param {Object} options
   * @param {number} options.color=0x5699d2 spinner's color
   */
  function Spinner() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$color = _ref.color,
        color = _ref$color === void 0 ? 0x5699d2 : _ref$color;

    _classCallCheck(this, Spinner);

    _this = _super.call(this);
    var image = new Image();
    image.src = dataURL;
    /**
     * @ignore
     */

    _this.texture = PIXI.Texture.from(image);
    /**
     * @ignore
     */

    _this.tint = color;

    _this.anchor.set(0.5);

    _this.scale.set(1.2);

    return _this;
  }

  _createClass(Spinner, [{
    key: "onUpdate",
    value: function onUpdate() {
      /**
       * @ignore
       */
      this.rotation += 0.1;
    }
  }]);

  return Spinner;
}(PIXI.Sprite);

export default Spinner;
//# sourceMappingURL=Spinner.js.map