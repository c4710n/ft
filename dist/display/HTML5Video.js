function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
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

import { Device, PIXI } from '../core';
import Video from './Video';
import DOM from './DOM';
/**
 * Video player based on HTML5 `<video>` tag.
 *
 * @example
 * // create
 * const url = 'https://url/to/video'
 * const video = new HTML5Video(url)
 *
 * // unlock
 * await video.unlock()
 *
 * // play
 * await video.play()
 */

var HTML5Video = /*#__PURE__*/function (_Video) {
  _inherits(HTML5Video, _Video);

  var _super = _createSuper(HTML5Video);

  function HTML5Video() {
    var _this;

    _classCallCheck(this, HTML5Video);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.$preplayPromise = null;
    _this.$ready = false;
    return _this;
  }

  _createClass(HTML5Video, [{
    key: "createVideoPlayer",
    value: function createVideoPlayer(url) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          layer = _ref.layer,
          poster = _ref.poster,
          loop = _ref.loop,
          controls = _ref.controls;

      var video = new DOM('video', {
        layer: layer
      }).setOrigin(0.5);
      this.video = video;
      this.addChild(video);
      var videoDOM = video.dom;
      videoDOM.src = url;
      videoDOM.loop = loop;
      videoDOM.style.objectFit = 'fill';
      videoDOM.crossorigin = 'anonymous';
      videoDOM.controls = controls;
      videoDOM.setAttribute('preload', 'auto');
      videoDOM.setAttribute('playsinline', '');
      videoDOM.setAttribute('webkit-playsinline', ''); // WebKit-based browser adaptation
      // QQ Browser on iOS

      if (Device.isIOS && Device.isQQBrowser) {
        videoDOM.setAttribute('x5-playsinline', '');
      }

      var posterTexture = poster;

      if (posterTexture) {
        var _poster = new PIXI.Sprite(posterTexture).setOrigin(0.5);

        this.addChild(_poster);
        this.$poster = _poster;
      }

      var videoPlayer = videoDOM;
      return videoPlayer;
    }
  }, {
    key: "muted",
    get: function get() {
      return this.videoPlayer.muted;
    },
    set: function set(value) {
      if (value === true) {
        this.videoPlayer.muted = true;
      } else {
        this.videoPlayer.muted = false;
      }
    }
  }, {
    key: "onAdded",
    value: function onAdded() {
      this.videoPlayer.addEventListener('ended', this.onEnd);
    }
  }, {
    key: "onRemoved",
    value: function onRemoved() {
      this.videoPlayer.removeEventListener('ended', this.onEnd);
    }
  }, {
    key: "setSize",
    value: function setSize() {
      var _get2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (this.$poster) {
        var _this$$poster;

        (_this$$poster = this.$poster).setSize.apply(_this$$poster, args);
      }

      return (_get2 = _get(_getPrototypeOf(HTML5Video.prototype), "setSize", this)).call.apply(_get2, [this].concat(args));
    }
  }, {
    key: "setAngle",
    value: function setAngle() {
      var _get3;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (this.$poster) {
        var _this$$poster2;

        (_this$$poster2 = this.$poster).setAngle.apply(_this$$poster2, args);
      }

      return (_get3 = _get(_getPrototypeOf(HTML5Video.prototype), "setAngle", this)).call.apply(_get3, [this].concat(args));
    }
    /**
     * Unlock current video.
     *
     * @example
     * video1.unlock()
     * video2.unlock()
     * video3.unlock()
     * await video1.play()
     *
     * @see https://stackoverflow.com/a/50480115/1793548
     */

  }, {
    key: "unlock",
    value: function unlock() {
      this.videoPlayer.play();
      this.videoPlayer.pause();
    }
    /**
     * Play current video.
     *
     * This method will preplay video beforehand. There are following reasons to
     * do this:
     * 1. solve the blinking problem when playing video on Android devices.
     * 2. fetch metadata of video in advance, such as `duration`.
     *
     * @emits {play}
     * @return {Promise} same as DOM API - `play()`
     */

  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      var videoPlayer = this.videoPlayer;

      if (this.$ready) {
        this.emit('play');
        return this.nativePlay();
      }

      this.$preplayPromise = this.$preplayPromise || new Promise(function (resolve) {
        var listener = function listener() {
          var currentTime = videoPlayer.currentTime;

          if (currentTime > 0) {
            videoPlayer.removeEventListener('timeupdate', listener);
            _this2.$ready = true;
            _this2.$readyTime = currentTime;
            videoPlayer.muted = false;

            _this2.emit('play');

            resolve();
          }
        };

        videoPlayer.addEventListener('timeupdate', listener);
        videoPlayer.muted = true;

        _this2.nativePlay();
      });
      return this.$preplayPromise;
    }
  }, {
    key: "nativePlay",
    value: function nativePlay() {
      _get(_getPrototypeOf(HTML5Video.prototype), "nativePlay", this).call(this);

      return this.videoPlayer.play();
    }
  }, {
    key: "nativePause",
    value: function nativePause() {
      _get(_getPrototypeOf(HTML5Video.prototype), "nativePause", this).call(this);

      return this.videoPlayer.pause();
    }
  }]);

  return HTML5Video;
}(Video);

export default HTML5Video;
//# sourceMappingURL=HTML5Video.js.map