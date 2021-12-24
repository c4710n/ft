function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.function.name.js";
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

import Component from './Component';
import { clamp } from '../util/math';

var Slidable = /*#__PURE__*/function (_Component) {
  _inherits(Slidable, _Component);

  var _super = _createSuper(Slidable);

  function Slidable(direction) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$min = _ref.min,
        min = _ref$min === void 0 ? -400 : _ref$min,
        _ref$max = _ref.max,
        max = _ref$max === void 0 ? 0 : _ref$max,
        onCompleted = _ref.onCompleted,
        onFailed = _ref.onFailed;

    _classCallCheck(this, Slidable);

    _this = _super.call(this);
    _this.name = 'slidable';
    _this.$dragging = false;
    _this.$eventData = null;
    _this.$pointerdownLocalY = 0;
    _this.$previousTimestamp = 0;

    _this.reset(direction, {
      min: min,
      max: max,
      onCompleted: onCompleted,
      onFailed: onFailed
    });

    return _this;
  }

  _createClass(Slidable, [{
    key: "reset",
    value: function reset(direction, _ref2) {
      var min = _ref2.min,
          max = _ref2.max,
          onCompleted = _ref2.onCompleted,
          onFailed = _ref2.onFailed;
      this.direction = direction;
      this.min = min;
      this.max = max;
      this.completed = false;
      this.onCompleted = onCompleted;
      this.onFailed = onFailed;
    }
  }, {
    key: "onAdded",
    value: function onAdded(displayObject) {
      displayObject.on('pointerdown', this.onPointerDown, this);
      displayObject.on('pointerup', this.onPointerUp, this);
      displayObject.on('pointerupoutside', this.onPointerUp, this);
      displayObject.on('pointermove', this.onPointerMove, this);
    }
  }, {
    key: "onRemoved",
    value: function onRemoved(displayObject) {
      displayObject.off('pointerdown', this.onPointerDown, this);
      displayObject.off('pointerup', this.onPointerUp, this);
      displayObject.off('pointerupoutside', this.onPointerUp, this);
      displayObject.off('pointermove', this.onPointerMove, this);
    }
  }, {
    key: "onPointerDown",
    value: function onPointerDown(event) {
      if (this.completed) return;
      var displayObject = this.displayObject;
      this.$dragging = true;
      this.$eventData = event.data; // click position relative to current displayObject

      this.$pointerdownLocalY = this.$eventData.getLocalPosition(displayObject).y; // displayObject's position relative to its parent

      var currentY = this.$eventData.getLocalPosition(displayObject.parent).y;
      this.$previousY = currentY - this.$pointerdownLocalY;
      this.$previousTimestamp = this.$eventData.originalEvent.timeStamp;
    }
  }, {
    key: "onPointerMove",
    value: function onPointerMove(event) {
      if (this.completed) return;
      if (!this.$dragging) return;
      var displayObject = this.displayObject,
          $previousY = this.$previousY,
          $previousTimestamp = this.$previousTimestamp,
          direction = this.direction,
          min = this.min,
          max = this.max,
          onCompleted = this.onCompleted;
      var currentY = this.$eventData.getLocalPosition(displayObject.parent).y;
      var currentTimestamp = event.data.originalEvent.timeStamp;
      var $currentY = currentY - this.$pointerdownLocalY;
      var deltaY = $currentY - $previousY;
      var deltaTime = currentTimestamp - $previousTimestamp;
      var speed = Math.abs(deltaY / deltaTime);
      var y = clamp($currentY, min, max);
      displayObject.position.y = y;

      if (speed > 1 || direction === 'up' && y === min || direction === 'down' && y === max) {
        this.completed = true;
        onCompleted === null || onCompleted === void 0 ? void 0 : onCompleted({
          direction: direction,
          min: min,
          max: max
        });
      }
    }
  }, {
    key: "onPointerUp",
    value: function onPointerUp() {
      this.$dragging = false;
      this.$eventData = null;
      var completed = this.completed,
          direction = this.direction,
          min = this.min,
          max = this.max,
          onFailed = this.onFailed,
          displayObject = this.displayObject;

      if (!completed) {
        if (direction === 'up') {
          onFailed === null || onFailed === void 0 ? void 0 : onFailed({
            direction: direction,
            min: min,
            max: max
          });
          displayObject.position.y = max;
        }

        if (direction === 'down') {
          onFailed === null || onFailed === void 0 ? void 0 : onFailed({
            direction: direction,
            min: min,
            max: max
          });
        }
      }
    }
  }]);

  return Slidable;
}(Component);

export default Slidable;
//# sourceMappingURL=Slidable.js.map