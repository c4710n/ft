function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import EventEmitter from 'eventemitter3';
import ResManager from './ResManager';
import TimeMixer from './TimeMixer';

var AdvancedResManager = /*#__PURE__*/function (_ResManager) {
  _inherits(AdvancedResManager, _ResManager);

  var _super = _createSuper(AdvancedResManager);

  function AdvancedResManager() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$concurrency = _ref.concurrency,
        concurrency = _ref$concurrency === void 0 ? 10 : _ref$concurrency,
        _ref$mixTime = _ref.mixTime,
        mixTime = _ref$mixTime === void 0 ? 1000 : _ref$mixTime,
        _ref$mixRatio = _ref.mixRatio,
        mixRatio = _ref$mixRatio === void 0 ? 0.2 : _ref$mixRatio;

    _classCallCheck(this, AdvancedResManager);

    _this = _super.call(this, '', concurrency);
    _this.mixTime = mixTime;
    _this.mixRatio = mixRatio;
    _this._ee_ = new EventEmitter();
    _this.currentProgressRM = 0;
    _this.currentProgressTM = 0;
    _this.loadComplete = false;
    return _this;
  }

  _createClass(AdvancedResManager, [{
    key: "setMix",
    value: function setMix() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          time = _ref2.time,
          ratio = _ref2.ratio;

      if (time) this.mixTime = time;
      if (ratio) this.mixRatio = ratio;
    }
  }, {
    key: "on",
    value: function on() {
      var _this$_ee_;

      (_this$_ee_ = this._ee_).on.apply(_this$_ee_, arguments);
    }
  }, {
    key: "once",
    value: function once() {
      var _this$_ee_2;

      (_this$_ee_2 = this._ee_).once.apply(_this$_ee_2, arguments);
    }
  }, {
    key: "off",
    value: function off() {
      var _this$_ee_3;

      (_this$_ee_3 = this._ee_).off.apply(_this$_ee_3, arguments);
    }
  }, {
    key: "load",
    value: function load() {
      var _this2 = this;

      // resource manager
      var rm = this;
      rm.onProgress.add(function (_ref3) {
        var progress = _ref3.progress;

        _this2.onProgressChange({
          rm: progress
        });
      });
      rm.onComplete.add(function (_ref4) {
        var progress = _ref4.progress;

        _this2.onProgressChange({
          rm: progress
        });
      }); // time mixer

      var mixTime = this.mixTime;
      var tm = new TimeMixer(mixTime);
      this.tm = tm;
      tm.onProgress.add(function (_ref5) {
        var progress = _ref5.progress;

        _this2.onProgressChange({
          tm: progress
        });
      });
      tm.onComplete.add(function (_ref6) {
        var progress = _ref6.progress;

        _this2.onProgressChange({
          tm: progress
        });
      });

      _get(_getPrototypeOf(AdvancedResManager.prototype), "load", this).call(this);

      this.tm.load();
    }
  }, {
    key: "onProgressChange",
    value: function onProgressChange() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          rm = _ref7.rm,
          tm = _ref7.tm;

      var mixRatio = this.mixRatio;
      var currentProgressRM = this.currentProgressRM,
          currentProgressTM = this.currentProgressTM;
      var newProgressRM = rm || currentProgressRM;
      var newProgressTM = tm || currentProgressTM;
      this.currentProgressRM = newProgressRM;
      this.currentProgressTM = newProgressTM;
      var progress = (1 - mixRatio) * newProgressRM + mixRatio * newProgressTM;

      if (progress == 100) {
        if (!this.loadComplete) {
          this.loadComplete = true;

          this._ee_.emit('complete', progress);
        }
      } else {
        this._ee_.emit('progress', progress);
      }
    }
  }]);

  return AdvancedResManager;
}(ResManager);

AdvancedResManager["default"] = new AdvancedResManager();
export default AdvancedResManager;
//# sourceMappingURL=AdvancedResManager.js.map