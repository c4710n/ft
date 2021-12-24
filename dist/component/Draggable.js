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
/**
 * Make a display object draggable.
 *
 * @example
 * const displayObject = FT.create(Text, 'Hello World')
 * const draggable = new Draggable()
 * displayObject.addComponent(draggable)
 */

var Draggable = /*#__PURE__*/function (_Component) {
  _inherits(Draggable, _Component);

  var _super = _createSuper(Draggable);

  function Draggable() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$enableX = _ref.enableX,
        enableX = _ref$enableX === void 0 ? true : _ref$enableX,
        _ref$enableY = _ref.enableY,
        enableY = _ref$enableY === void 0 ? true : _ref$enableY,
        onStart = _ref.onStart,
        onMove = _ref.onMove,
        onEnd = _ref.onEnd;

    _classCallCheck(this, Draggable);

    _this = _super.call(this);
    _this.name = 'draggable';
    /**
     * @access private
     */

    _this.$dragging = false;
    /**
     * @access private
     */

    _this.$eventData = null;
    /**
     * @access private
     */

    _this.$pointerdownPosition = null;
    _this.enableX = enableX;
    _this.enableY = enableY;
    _this.onStart = onStart;
    _this.onMove = onMove;
    _this.onEnd = onEnd;
    return _this;
  }

  _createClass(Draggable, [{
    key: "onAdded",
    value: function onAdded(displayObject) {
      displayObject.interactive = true;
      displayObject.on('pointerdown', this.onDragStart, this);
      displayObject.on('pointerup', this.onDragEnd, this);
      displayObject.on('pointerupoutside', this.onDragEnd, this);
      displayObject.on('pointermove', this.onDragMove, this);
    }
  }, {
    key: "onRemoved",
    value: function onRemoved(displayObject) {
      displayObject.interactive = false;
      displayObject.off('pointerdown', this.onDragStart, this);
      displayObject.off('pointerup', this.onDragEnd, this);
      displayObject.off('pointerupoutside', this.onDragEnd, this);
      displayObject.off('pointermove', this.onDragMove, this);
    }
    /**
     * @access private
     */

  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      var _component$onStart;

      var component = this;
      var displayObject = this.displayObject;
      this.$dragging = true;
      this.$eventData = event.data; // click position relative to current displayObject

      this.$pointerdownPosition = this.$eventData.getLocalPosition(displayObject);
      (_component$onStart = component.onStart) === null || _component$onStart === void 0 ? void 0 : _component$onStart.call(component, displayObject);
    }
    /**
     * @access private
     */

  }, {
    key: "onDragEnd",
    value: function onDragEnd() {
      var _component$onEnd;

      var component = this;
      var displayObject = this.displayObject;
      this.$dragging = false;
      this.$eventData = null;
      (_component$onEnd = component.onEnd) === null || _component$onEnd === void 0 ? void 0 : _component$onEnd.call(component, displayObject);
    }
    /**
     * @access private
     */

  }, {
    key: "onDragMove",
    value: function onDragMove() {
      if (!this.$dragging) return;
      var component = this;
      var displayObject = this.displayObject; // click position relative to the parent of current displayObject

      var currentPosition = this.$eventData.getLocalPosition(displayObject.parent);
      var nextX = currentPosition.x - this.$pointerdownPosition.x;
      var nextY = currentPosition.y - this.$pointerdownPosition.y;

      if (component.onMove) {
        component.onMove(displayObject, nextX, nextY);
      } else {
        this.positionDisplayObject(nextX, nextY);
      }
    }
  }, {
    key: "positionDisplayObject",
    value: function positionDisplayObject(x, y) {
      var displayObject = this.displayObject,
          enableX = this.enableX,
          enableY = this.enableY;

      if (enableX) {
        displayObject.position.x = x;
      }

      if (enableY) {
        displayObject.position.y = y;
      }
    }
  }]);

  return Draggable;
}(Component);

export default Draggable;
//# sourceMappingURL=Draggable.js.map