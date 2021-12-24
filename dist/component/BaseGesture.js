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

var BaseGesture = /*#__PURE__*/function (_Component) {
  _inherits(BaseGesture, _Component);

  var _super = _createSuper(BaseGesture);

  function BaseGesture() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        onStart = _ref.onStart,
        onMove = _ref.onMove,
        onEnd = _ref.onEnd;

    _classCallCheck(this, BaseGesture);

    _this = _super.call(this);
    _this.name = 'base-gesture';
    _this.dragging = false;
    _this.eventData = null;
    _this.pointerdownPosition = null;
    _this.onStart = onStart;
    _this.onMove = onMove;
    _this.onEnd = onEnd;
    _this.moveDone = false;
    return _this;
  }

  _createClass(BaseGesture, [{
    key: "onAdded",
    value: function onAdded(displayObject) {
      displayObject.interactive = true;
      displayObject.on('pointerdown', this.onPointerDown, this);
      displayObject.on('pointerup', this.onPointerUp, this);
      displayObject.on('pointerupoutside', this.onPointerUp, this);
      displayObject.on('pointermove', this.onPointerMove, this);
    }
  }, {
    key: "onRemoved",
    value: function onRemoved(displayObject) {
      displayObject.interactive = false;
      displayObject.off('pointerdown', this.onPointerDown, this);
      displayObject.off('pointerup', this.onPointerUp, this);
      displayObject.off('pointerupoutside', this.onPointerUp, this);
      displayObject.off('pointermove', this.onPointerMove, this);
    }
  }, {
    key: "onPointerDown",
    value: function onPointerDown(event) {
      var _component$onStart;

      var component = this;
      var displayObject = this.displayObject;
      this.dragging = true;
      this.moveDone = false;
      this.eventData = event.data; // click position relative to current displayObject

      this.pointerdownPosition = this.eventData.getLocalPosition(displayObject);
      (_component$onStart = component.onStart) === null || _component$onStart === void 0 ? void 0 : _component$onStart.call(component, displayObject);
    }
  }, {
    key: "onPointerUp",
    value: function onPointerUp() {
      var _component$onEnd;

      var component = this;
      var displayObject = this.displayObject;
      this.dragging = false;
      this.eventData = null;
      (_component$onEnd = component.onEnd) === null || _component$onEnd === void 0 ? void 0 : _component$onEnd.call(component, displayObject);
    }
  }, {
    key: "onPointerMove",
    value: function onPointerMove() {
      if (!this.dragging || this.moveDone) return;
      var component = this;
      var displayObject = this.displayObject,
          pointerdownPosition = this.pointerdownPosition; // click position relative to current displayObject

      var currentPosition = this.eventData.getLocalPosition(displayObject);
      var result = component.onMove(displayObject, pointerdownPosition, currentPosition);

      if (result === true) {
        this.moveDone = true;
      }
    }
  }]);

  return BaseGesture;
}(Component);

export default BaseGesture;
//# sourceMappingURL=BaseGesture.js.map