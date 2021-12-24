function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

import System from '../System';
import Device from '../../core/Device';
import events from '../../events';
import { delay } from '../../time';

var ResizeSystem = /*#__PURE__*/function (_System) {
  _inherits(ResizeSystem, _System);

  var _super = _createSuper(ResizeSystem);

  function ResizeSystem() {
    var _this;

    _classCallCheck(this, ResizeSystem);

    _this = _super.call(this, 'resize');

    var _Device$cssSize$clone = Device.cssSize.clone(),
        width = _Device$cssSize$clone.width,
        height = _Device$cssSize$clone.height;

    _this.$cachedWidth = width;
    _this.$cachedHeight = height;
    _this.$cachedHasInputFocused = false;
    _this.$emitLock = false;
    events.resize.emit();
    return _this;
  }

  _createClass(ResizeSystem, [{
    key: "update",
    value: function update() {
      var hasInputFocused = document.activeElement && document.activeElement.tagName === 'INPUT' && document.hasFocus();
      var isInputSwitchToBlured = this.$cachedHasInputFocused === true && hasInputFocused === false;

      if (isInputSwitchToBlured) {
        this.delayEmitResizeEvent();
      } else if (!hasInputFocused) {
        this.emitResizeEvent();
      }

      this.$cachedHasInputFocused = hasInputFocused;
    }
  }, {
    key: "emitResizeEvent",
    value: function emitResizeEvent() {
      if (this.$emitLock) return;

      var _Device$cssSize$clone2 = Device.cssSize.clone(),
          width = _Device$cssSize$clone2.width,
          height = _Device$cssSize$clone2.height;

      if (width !== this.$cachedWidth || height !== this.$cachedHeight) {
        this.$cachedWidth = width;
        this.$cachedHeight = height;
        events.resize.emit();
      }
    }
  }, {
    key: "delayEmitResizeEvent",
    value: function () {
      var _delayEmitResizeEvent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.$emitLock) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                this.$emitLock = true;
                _context.next = 5;
                return delay(250);

              case 5:
                this.$emitLock = false;

                if (Device.isIOS) {
                  window.scroll(0, 0);
                }

                this.emitResizeEvent();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function delayEmitResizeEvent() {
        return _delayEmitResizeEvent.apply(this, arguments);
      }

      return delayEmitResizeEvent;
    }()
  }]);

  return ResizeSystem;
}(System);

export default ResizeSystem;
//# sourceMappingURL=index.js.map