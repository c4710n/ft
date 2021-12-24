function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.array.concat.js";
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

import app from '../../app';
import System from '../System';
import modes from './Modes';
import events from '../../events';
import { classname } from '../../util';

var ScaleSystem = /*#__PURE__*/function (_System) {
  _inherits(ScaleSystem, _System);

  var _super = _createSuper(ScaleSystem);

  function ScaleSystem() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$mode = _ref.mode,
        mode = _ref$mode === void 0 ? 'COVER' : _ref$mode;

    _classCallCheck(this, ScaleSystem);

    _this = _super.call(this, 'scale');
    _this.container = app.container;
    _this.mode = mode;
    events.resize.on(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;

      _this.scale(width, height);
    }, _assertThisInitialized(_this));
    return _this;
  }
  /**
   * @access private
   */


  _createClass(ScaleSystem, [{
    key: "scale",
    value: function scale(viewportCSSWidth, viewportCSSHeight) {
      var _app$systems$render = app.systems.render,
          width = _app$systems$render.width,
          height = _app$systems$render.height;
      var mode = this.mode;
      var scaleMode = modes[mode];

      if (!scaleMode) {
        throw new Error("[".concat(classname(this), "] unsupported scale mode - ").concat(mode));
      }

      var _scaleMode = scaleMode(width, height, viewportCSSWidth, viewportCSSHeight),
          shouldRotate = _scaleMode.shouldRotate,
          position = _scaleMode.position,
          bounds = _scaleMode.bounds,
          viewport = _scaleMode.viewport;

      this.rotate = shouldRotate;
      this.position = position;
      this.bounds = bounds;
      app.size.screen = bounds;
      this.viewport = viewport;
      var scale = position.scale,
          offsetCSSX = position.offsetCSSX,
          offsetCSSY = position.offsetCSSY;
      var rotation = 0;

      if (shouldRotate) {
        rotation = 90;
        var baseOffsetCSSX = 0;
        var baseOffsetCSSY = viewport.cssHeight;
        offsetCSSX = baseOffsetCSSX + offsetCSSX;
        offsetCSSY = baseOffsetCSSY - offsetCSSY;
        var _ref3 = [offsetCSSY, offsetCSSX];
        offsetCSSX = _ref3[0];
        offsetCSSY = _ref3[1];
      }

      this.container.style.position = 'absolute';
      this.container.style.width = "".concat(width, "px");
      this.container.style.height = "".concat(height, "px");
      this.container.style.transformOrigin = '0 0';
      this.container.style.transform = "matrix(".concat(scale, ", 0, 0, ").concat(scale, ", ").concat(offsetCSSX, ", ").concat(offsetCSSY, ") rotate(").concat(rotation, "deg)");
    }
  }]);

  return ScaleSystem;
}(System);

export default ScaleSystem;
//# sourceMappingURL=index.js.map