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

import EventEmitter from 'eventemitter3';
import Video from '../Video';
import DOM from '../DOM';
import JSMpeg from './vendor/jsmpeg.min';
var EE = new EventEmitter();
/**
 * Video player based on JSMpeg.
 *
 * @example
 * // create
 * const url = 'https://url/to/video'
 * const video = new CanvasVideo(url)
 *
 * // play
 * video.play()
 */

var CanvasVideo = /*#__PURE__*/function (_Video) {
  _inherits(CanvasVideo, _Video);

  var _super = _createSuper(CanvasVideo);

  function CanvasVideo() {
    var _this;

    _classCallCheck(this, CanvasVideo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.isPlayed = false;
    return _this;
  }

  _createClass(CanvasVideo, [{
    key: "createVideoPlayer",
    value: function createVideoPlayer(url) {
      var _this2 = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          layer = _ref.layer,
          poster = _ref.poster,
          loop = _ref.loop;

      var video = new DOM('canvas', {
        layer: layer
      }).setOrigin(0.5);
      this.video = video;
      this.addChild(video);
      var posterURL = poster;
      var options = {
        canvas: video.dom,
        poster: posterURL,
        loop: loop,
        videoBufferSize: 2048 * 1024,
        // 1024 means 1KB
        onPlay: function onPlay() {
          _this2.onPlay(_this2);
        },
        onEnded: this.onEnd
      };
      var videoPlayer = new JSMpeg.Player(url, options);
      return videoPlayer;
    }
  }, {
    key: "muted",
    get: function get() {
      return this.videoPlayer.volume === 0;
    },
    set: function set(value) {
      if (value === true) {
        this.videoPlayer.volume = 0;
      } else {
        this.videoPlayer.volume = 1;
      }
    }
  }, {
    key: "onPlay",
    value: function onPlay(context) {
      if (!context.isPlayed && context.videoPlayer.isPlaying) {
        context.isPlayed = true;
        EE.emit('play');
      }
    }
  }, {
    key: "nativePlay",
    value: function nativePlay() {
      _get(_getPrototypeOf(CanvasVideo.prototype), "nativePlay", this).call(this);

      var promise = new Promise(function (resolve) {
        EE.on('play', resolve);
      });
      this.videoPlayer.play();
      return promise;
    }
  }, {
    key: "nativePause",
    value: function nativePause() {
      var _this3 = this;

      _get(_getPrototypeOf(CanvasVideo.prototype), "nativePause", this).call(this);

      return new Promise(function (resolve) {
        _this3.videoPlayer.pause();

        resolve();
      });
    }
  }]);

  return CanvasVideo;
}(Video);

export default CanvasVideo;
//# sourceMappingURL=index.js.map