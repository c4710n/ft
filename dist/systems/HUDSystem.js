function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

import "core-js/modules/es.number.parse-float.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.string.ends-with.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.array.is-array.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
import app from '../app';
import System from './System';

function checkPercentage(value) {
  var num = Number.parseFloat(value);

  if (typeof value === 'string' && value.endsWith('%') && typeof num === 'number' && num <= 100 && num >= 0) {
    var percentage = num / 100;
    return [true, percentage];
  } else {
    return [false];
  }
}

var HUDSystem = /*#__PURE__*/function (_System) {
  _inherits(HUDSystem, _System);

  var _super = _createSuper(HUDSystem);

  function HUDSystem() {
    _classCallCheck(this, HUDSystem);

    return _super.call(this, 'hud');
  }

  _createClass(HUDSystem, [{
    key: "update",
    value: function update() {
      var _this = this;

      this.entities.forEach(function (entity) {
        var component = entity.components[_this.name];

        _this.position(entity, component);
      });
    }
  }, {
    key: "position",
    value: function position(entity, component) {
      var $x, $y;
      var left = component.left,
          right = component.right,
          top = component.top,
          bottom = component.bottom;
      var bounds = app.systems.scale.bounds;

      if (left !== undefined) {
        var _checkPercentage = checkPercentage(left),
            _checkPercentage2 = _slicedToArray(_checkPercentage, 2),
            isPercentage = _checkPercentage2[0],
            percentage = _checkPercentage2[1];

        var offset = isPercentage ? bounds.width * percentage : left;
        $x = bounds.left + offset;
      }

      if (right !== undefined) {
        var _checkPercentage3 = checkPercentage(right),
            _checkPercentage4 = _slicedToArray(_checkPercentage3, 2),
            _isPercentage = _checkPercentage4[0],
            _percentage = _checkPercentage4[1];

        var _offset = _isPercentage ? bounds.width * _percentage : right;

        $x = bounds.right - _offset;
      }

      if (top !== undefined) {
        var _checkPercentage5 = checkPercentage(top),
            _checkPercentage6 = _slicedToArray(_checkPercentage5, 2),
            _isPercentage2 = _checkPercentage6[0],
            _percentage2 = _checkPercentage6[1];

        var _offset2 = _isPercentage2 ? bounds.height * _percentage2 : top;

        $y = bounds.top + _offset2;
      }

      if (bottom !== undefined) {
        var _checkPercentage7 = checkPercentage(bottom),
            _checkPercentage8 = _slicedToArray(_checkPercentage7, 2),
            _isPercentage3 = _checkPercentage8[0],
            _percentage3 = _checkPercentage8[1];

        var _offset3 = _isPercentage3 ? bounds.height * _percentage3 : bottom;

        $y = bounds.bottom - _offset3;
      }

      if ($x) entity.x = $x;
      if ($y) entity.y = $y;
    }
  }]);

  return HUDSystem;
}(System);

export default HUDSystem;
//# sourceMappingURL=HUDSystem.js.map