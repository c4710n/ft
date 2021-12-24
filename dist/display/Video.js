function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Layer, PIXI } from '../core';
import { timeout } from '../time';

var Video = /*#__PURE__*/function (_PIXI$Container) {
  _inherits(Video, _PIXI$Container);

  var _super = _createSuper(Video);

  /**
   * @param {string} url='' url of video
   * @param {Object} options
   */
  function Video(url) {
    var _this;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$layer = _ref.layer,
        layer = _ref$layer === void 0 ? Layer.DOM_DISPLAY : _ref$layer,
        poster = _ref.poster,
        _ref$loop = _ref.loop,
        loop = _ref$loop === void 0 ? false : _ref$loop,
        _ref$controls = _ref.controls,
        controls = _ref$controls === void 0 ? false : _ref$controls,
        _ref$spinnerTimeout = _ref.spinnerTimeout,
        spinnerTimeout = _ref$spinnerTimeout === void 0 ? 300 : _ref$spinnerTimeout,
        onShowSpinner = _ref.onShowSpinner,
        onHideSpinner = _ref.onHideSpinner;

    _classCallCheck(this, Video);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onEnd", function () {
      var _this$onHideSpinner, _this2;

      _this.emit('end');

      _this.$playing = false;

      _this.$spinnerTimer.stop();

      (_this$onHideSpinner = (_this2 = _this).onHideSpinner) === null || _this$onHideSpinner === void 0 ? void 0 : _this$onHideSpinner.call(_this2, _assertThisInitialized(_this));
    });

    _this.$readyTime = 0;
    _this.$playing = false;
    _this.$previousTime = 0;
    _this.videoPlayer = _this.createVideoPlayer(url, {
      layer: layer,
      poster: poster,
      loop: loop,
      controls: controls
    });
    _this.onShowSpinner = onShowSpinner;
    _this.onHideSpinner = onHideSpinner;
    _this.$spinnerTimer = timeout(spinnerTimeout, function () {
      if (_this.isCaching) {
        var _this$onShowSpinner, _this3;

        (_this$onShowSpinner = (_this3 = _this).onShowSpinner) === null || _this$onShowSpinner === void 0 ? void 0 : _this$onShowSpinner.call(_this3, _assertThisInitialized(_this));
      }
    });
    return _this;
  }

  _createClass(Video, [{
    key: "onAdded",
    value: function onAdded() {}
  }, {
    key: "onRemoved",
    value: function onRemoved() {}
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      var currentTime = this.currentTime;

      if (this.isPlaying) {
        this.$spinnerTimer.reset();
        this.emit('progress', currentTime);
      }

      if (this.isPlaying || this.isPaused) {
        var _this$onHideSpinner2;

        (_this$onHideSpinner2 = this.onHideSpinner) === null || _this$onHideSpinner2 === void 0 ? void 0 : _this$onHideSpinner2.call(this, this);
      }

      this.$previousTime = currentTime;
    } // eslint-disable-next-line

  }, {
    key: "createVideoPlayer",
    value: function createVideoPlayer(url) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          layer = _ref2.layer,
          poster = _ref2.poster,
          loop = _ref2.loop;
    }
  }, {
    key: "setSize",
    value: function setSize() {
      var _this$video;

      (_this$video = this.video).setSize.apply(_this$video, arguments);

      return this;
    }
  }, {
    key: "setAngle",
    value: function setAngle() {
      var _this$video2;

      (_this$video2 = this.video).setAngle.apply(_this$video2, arguments);

      return this;
    }
  }, {
    key: "setLayer",
    value: function setLayer() {
      var layer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Layer.DOM_DISPLAY_HIDDEN;
      this.video.layer = layer;
      return this;
    }
  }, {
    key: "unlock",
    value: function unlock() {}
  }, {
    key: "play",
    value: function play() {
      this.emit('play');
      return this.nativePlay();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.emit('pause');
      return this.nativePause();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.emit('reset');
      this.videoPlayer.currentTime = this.$readyTime;
    }
  }, {
    key: "nativePlay",
    value: function nativePlay() {
      this.$playing = true;
      this.$spinnerTimer.start();
    }
  }, {
    key: "nativePause",
    value: function nativePause() {
      this.$playing = false;
      this.$spinnerTimer.stop();
    }
  }, {
    key: "duration",
    get: function get() {
      return this.videoPlayer.duration;
    }
  }, {
    key: "currentTime",
    get: function get() {
      return this.videoPlayer.currentTime;
    },
    set: function set(value) {
      this.videoPlayer.currentTime = value;
    }
  }, {
    key: "isCaching",
    get: function get() {
      return this.added && this.$playing && this.currentTime <= this.$previousTime;
    }
  }, {
    key: "isPlaying",
    get: function get() {
      return this.added && this.$playing && this.currentTime > this.$previousTime;
    }
  }, {
    key: "isPaused",
    get: function get() {
      return this.added && !this.$playing && this.currentTime == this.$previousTime;
    }
  }]);

  return Video;
}(PIXI.Container);

export default Video;
//# sourceMappingURL=Video.js.map