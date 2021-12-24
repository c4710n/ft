function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.is-array.js";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

import { PIXI } from '../core';
import { Tween, Easing } from '../animation';
import { clamp } from '../util/math';
var Sprite = PIXI.Sprite;
var WHITE = PIXI.Texture.WHITE;

var Scroller = /*#__PURE__*/function (_PIXI$Container) {
  _inherits(Scroller, _PIXI$Container);

  var _super = _createSuper(Scroller);

  /**
   * @param {DisplayObject} content the content will be scrolled
   * @param {Object} options
   * @param {number} [options.width=750] the width of scroller
   * @param {number} [options.height=1500] the height of scroller
   * @param {boolean} [options.enableX=false] enable scrolling in X direction
   * @param {boolean} [options.enableY=true] enable scrolling in Y direction
   * @param {number} [options.resistance=20] the resistance of scrolling, valid value: 0 - 99
   * @param {number} [options.overflow=100] overflow distance of bounce
   * @param {number} [options.bgColor=0xffffff] background color
   */
  function Scroller(content, options) {
    var _this;

    _classCallCheck(this, Scroller);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "onPointerDown", function (event) {
      _this.stopTween();

      _this.isScrolling = true;
      _this.data = event.data;
      _this.pointerDownPosition = _this.data.getLocalPosition(_this.content);
      _this.pointerDownPosition.x *= _this.content.scale.x;
      _this.pointerDownPosition.y *= _this.content.scale.y;
      _this.previousPosition = _this.pointerDownPosition;
      _this.previousTimestamp = event.data.originalEvent.timeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "onPointerMove", function (event) {
      if (!_this.isScrolling) return;

      var currentPosition = _this.data.getLocalPosition(_assertThisInitialized(_this));

      var currentTimestamp = event.data.originalEvent.timeStamp;
      var time = currentTimestamp - _this.previousTimestamp;
      var factor = 10;

      if (_this.isEnabledX()) {
        var shiftX = currentPosition.x - _this.previousPosition.x;
        _this.scrollVelocityX = shiftX / time * factor;
        var x = currentPosition.x - _this.pointerDownPosition.x;

        if (x > _this.maxOverflowX) {
          x = _this.maxOverflowX;
        } else if (x < _this.minOverflowX) {
          x = _this.minOverflowX;
        }

        if (!_this.content.added) return;
        _this.content.x = x;
      }

      if (_this.isEnabledY()) {
        var shiftY = currentPosition.y - _this.previousPosition.y;
        _this.scrollVelocityY = shiftY / time * factor;
        var y = currentPosition.y - _this.pointerDownPosition.y;

        if (y > _this.maxOverflowY) {
          y = _this.maxOverflowY;
        } else if (y < _this.minOverflowY) {
          y = _this.minOverflowY;
        }

        if (!_this.content.added) return;
        _this.content.y = y;
      }

      _this.emitProgress();

      _this.previousPosition = currentPosition;
      _this.previousTimestamp = currentTimestamp;
    });

    _defineProperty(_assertThisInitialized(_this), "onPointerUp", function () {
      _this.isScrolling = false;
      _this.data = null;
      if (_this.isEnabledX()) _this.handleMovementX();
      if (_this.isEnabledY()) _this.handleMovementY();

      _this.resetScrollVelocity();
    });

    _defineProperty(_assertThisInitialized(_this), "stopTween", function () {
      if (_this.bounceX) _this.bounceX.stop();
      if (_this.bounceY) _this.bounceY.stop();
      if (_this.momentumX) _this.momentumX.stop();
      if (_this.momentumY) _this.momentumY.stop();
    });

    _defineProperty(_assertThisInitialized(_this), "handleMovementX", function () {
      var absScrollVelocityX = Math.abs(_this.scrollVelocityX);

      if (absScrollVelocityX >= 3) {
        var from = {};
        var to = {};
        from.velocity = _this.scrollVelocityX;
        to.velocity = 0;
        var cacheX = _this.content.x;
        var duration = (100 - _this.resistance) * absScrollVelocityX;
        var momentum = new Tween(from).to(to).duration(duration).easing(Easing.Quintic.Out).start();
        momentum.onUpdate(function (_ref) {
          var velocity = _ref.velocity;
          cacheX += velocity;

          if (cacheX <= _this.maxOverflowX && cacheX >= _this.minOverflowX) {
            if (!_this.content.added) return;
            _this.content.x = cacheX;

            _this.emitProgress();
          } else {
            momentum.stop();

            _this.handleBounceX({
              fromMomentum: true
            });
          }
        });
        momentum.onComplete(function () {
          return _this.handleBounceX({
            fromMomentum: true
          });
        });
        _this.momentumX = momentum;
      } else {
        _this.handleBounceX({
          fromMomentum: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMovementY", function () {
      var absScrollVelocityY = Math.abs(_this.scrollVelocityY);

      if (absScrollVelocityY >= 3) {
        var from = {};
        var to = {};
        from.velocity = _this.scrollVelocityY;
        to.velocity = 0;
        var cacheY = _this.content.y;
        var duration = (100 - _this.resistance) * absScrollVelocityY;

        _this.resetScrollVelocity();

        var momentum = new Tween(from).to(to).duration(duration).easing(Easing.Quintic.Out).start();
        momentum.onUpdate(function (_ref2) {
          var velocity = _ref2.velocity;
          cacheY += velocity;

          if (cacheY <= _this.maxOverflowY && cacheY >= _this.minOverflowY) {
            if (!_this.content.added) return;
            _this.content.y = cacheY;

            _this.emitProgress();
          } else {
            momentum.stop();

            _this.handleBounceY({
              fromMomentum: true
            });
          }
        });
        momentum.onComplete(function () {
          return _this.handleBounceY({
            fromMomentum: true
          });
        });
        _this.momentumY = momentum;
      } else {
        _this.handleBounceY({
          fromMomentum: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBounceX", function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$fromMomentum = _ref3.fromMomentum,
          fromMomentum = _ref3$fromMomentum === void 0 ? false : _ref3$fromMomentum;

      var x = _this.content.x;

      if (x > _this.maxX || x < _this.minX) {
        var from = {
          x: x
        };
        var to = {};

        if (x > _this.maxX) {
          to.x = _this.maxX;

          _this.emit('bounce', {
            type: 'right',
            fromMomentum: fromMomentum
          });
        } else if (x < _this.minX) {
          to.x = _this.minX;

          _this.emit('bounce', {
            type: 'left',
            fromMomentum: fromMomentum
          });
        }

        var bounce = new Tween(from).to(to).duration(1000).easing(Easing.Quartic.Out).start();
        bounce.onUpdate(function (_ref4) {
          var x = _ref4.x;
          if (!_this.content.added) return;
          _this.content.x = x;

          _this.emitProgress();
        });
        _this.bounceX = bounce;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBounceY", function () {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref5$fromMomentum = _ref5.fromMomentum,
          fromMomentum = _ref5$fromMomentum === void 0 ? false : _ref5$fromMomentum;

      var y = _this.content.y;

      if (y > _this.maxY || y < _this.minY) {
        var from = {
          y: y
        };
        var to = {};

        if (y > _this.maxY) {
          to.y = _this.maxY;

          _this.emit('bounce', {
            type: 'top',
            fromMomentum: fromMomentum
          });
        } else if (y < _this.minY) {
          to.y = _this.minY;

          _this.emit('bounce', {
            type: 'bottom',
            fromMomentum: fromMomentum
          });
        }

        var bounce = new Tween(from).to(to).duration(1000).easing(Easing.Quartic.Out).start();
        bounce.onUpdate(function (_ref6) {
          var y = _ref6.y;
          if (!_this.content.added) return;
          _this.content.y = y;

          _this.emitProgress();
        });
        _this.bounceY = bounce;
      }
    });

    var view = new PIXI.Container();
    /* bg */

    var bg = new Sprite(WHITE).setAlpha(0);
    _this.bg = bg;
    view.addChild(bg);
    /* mask */

    var mask = new PIXI.Graphics();

    _this.addChild(mask);

    _this.$mask = mask;
    view.mask = mask;
    /* content */
    // help to calculate the right size of content

    var basePoint = new Sprite(PIXI.Texture.WHITE).setAlpha(0).setSize(1, 1).setPosition(0, 0);
    content.addChild(basePoint);
    _this.content = content;
    view.addChild(content); // undefined value ensures that the first call of setup functions will not be skipped

    _this.cachedValues = {
      x: undefined,
      y: undefined,
      viewWidth: undefined,
      viewHeight: undefined,
      contentWidth: undefined,
      contentHeight: undefined
    };
    /* setup */

    _this.setup(options);

    view.setInteractive(true).on('pointerdown', _this.onPointerDown).on('pointermove', _this.onPointerMove).on('pointerup', _this.onPointerUp).on('pointerupoutside', _this.onPointerUp);

    _this.addChild(view);

    return _this;
  }
  /**
   * @access private
   */


  _createClass(Scroller, [{
    key: "emitProgress",
    value: function emitProgress() {
      var _this$content = this.content,
          x = _this$content.x,
          y = _this$content.y;
      var minX = this.minX,
          minY = this.minY;
      var progressX = minX === 0 ? 0 : x / minX;
      var progressY = minY === 0 ? 0 : y / minY;
      this.emit('progress', {
        x: progressX,
        y: progressY
      });
    }
  }, {
    key: "setProgress",
    value: function setProgress(x, y) {
      var minX = this.minX,
          minY = this.minY;
      this.content.x = minX * clamp(x, 0, 1);
      this.content.y = minY * clamp(y, 0, 1);
    }
    /**
     * @access private
     */

  }, {
    key: "resetScrollVelocity",
    value:
    /**
     * @access private
     */
    function resetScrollVelocity() {
      this.previousPosition = null;
      this.previousTimestamp = 0;
      this.scrollVelocityX = 0;
      this.scrollVelocityY = 0;
    }
  }, {
    key: "onUpdate",
    value: function onUpdate() {
      this.setupBounds();
      this.lazyRender();
    }
  }, {
    key: "setProp",
    value: function setProp(prop, value, defaultValue) {
      if (value === undefined) {
        if (this[prop] === undefined) {
          this[prop] = defaultValue;
        }
      } else {
        this[prop] = value;
      }
    }
  }, {
    key: "setup",
    value: function setup(_ref7) {
      var width = _ref7.width,
          height = _ref7.height,
          overflow = _ref7.overflow,
          resistance = _ref7.resistance,
          enableX = _ref7.enableX,
          enableY = _ref7.enableY,
          enableLazyRender = _ref7.enableLazyRender;
      this.setProp('viewWidth', width, 750);
      this.setProp('viewHeight', height, 1500);
      this.setProp('overflow', overflow, 50);
      this.setProp('resistance', resistance, 20);
      this.setProp('enableX', enableX, false);
      this.setProp('enableY', enableY, true);
      this.momentumX = null;
      this.momentumY = null;
      this.resetScrollVelocity();
      this.setProp('enableLazyRender', enableLazyRender, false);
      this.setupBounds();
      this.lazyRender();
    }
  }, {
    key: "setupBounds",
    value: function setupBounds() {
      var _this$content2 = this.content,
          currentContentWidth = _this$content2.width,
          currentContentHeight = _this$content2.height;
      var currentViewWidth = this.viewWidth,
          currentViewHeight = this.viewHeight;
      var _this$cachedValues = this.cachedValues,
          cachedContentWidth = _this$cachedValues.contentWidth,
          cachedContentHeight = _this$cachedValues.contentHeight,
          cachedViewWidth = _this$cachedValues.viewWidth,
          cachedViewHeight = _this$cachedValues.viewHeight;

      if (currentContentWidth === cachedContentWidth && currentContentHeight === cachedContentHeight && currentViewWidth === cachedViewWidth && currentViewHeight === cachedViewHeight) {
        return;
      }

      this.stopTween();
      this.cachedValues.viewWidth = currentViewWidth;
      this.cachedValues.viewHeight = currentViewHeight;
      this.cachedValues.contentWidth = currentContentWidth;
      this.cachedValues.contentHeight = currentContentHeight; // bg

      var bg = this.bg;
      bg.width = currentViewWidth;
      bg.height = currentViewHeight; // view mask

      var mask = this.$mask;
      mask.clear();
      mask.beginFill(0xffff00);
      mask.drawRect(0, 0, currentViewWidth, currentViewHeight);
      mask.endFill(); // position

      this.maxX = 0;
      this.minX = currentViewWidth - currentContentWidth;
      if (this.minX > 0) this.minX = 0;
      this.maxY = 0;
      this.minY = currentViewHeight - currentContentHeight;
      if (this.minY > 0) this.minY = 0; // if the scrolling distance beyonds the min and max value,
      // then reset it to min or max value

      if (this.content.x < this.minX) {
        this.content.x = this.minX;
      }

      if (this.content.x > this.maxX) {
        this.content.x = this.maxX;
      }

      if (this.content.y < this.minY) {
        this.content.y = this.minY;
      }

      if (this.content.y > this.maxY) {
        this.content.y = this.maxY;
      } // bounce related


      var overflow = this.overflow;
      this.bounceX = null;
      this.bounceY = null;
      this.maxOverflowX = overflow;
      this.minOverflowX = this.minX - overflow;
      this.maxOverflowY = overflow;
      this.minOverflowY = this.minY - overflow;
    }
  }, {
    key: "lazyRender",
    value: function lazyRender() {
      if (!this.enableLazyRender) return;
      var _this$content3 = this.content,
          currentX = _this$content3.x,
          currentY = _this$content3.y;
      var _this$cachedValues2 = this.cachedValues,
          cachedX = _this$cachedValues2.x,
          cachedY = _this$cachedValues2.y;

      if (currentX === cachedX && currentY === cachedY) {
        return;
      }

      this.cachedValues.x = currentX;
      this.cachedValues.y = currentY;
      var viewLeft = -this.content.x;
      var viewRight = viewLeft + this.viewWidth;
      var viewTop = -this.content.y;
      var viewBottom = viewTop + this.viewHeight;

      var _iterator = _createForOfIteratorHelper(this.content.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          var _getLocalPosition = getLocalPosition(child),
              top = _getLocalPosition.top,
              bottom = _getLocalPosition.bottom,
              left = _getLocalPosition.left,
              right = _getLocalPosition.right;

          var isChildOutOfView = top > viewBottom || bottom < viewTop || left > viewRight || right < viewLeft;

          if (isChildOutOfView) {
            child.renderable = false;
            child.visible = false;
          } else {
            child.renderable = true;
            child.visible = true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "isEnabledX",
    value: function isEnabledX() {
      var _this$cachedValues3 = this.cachedValues,
          viewWidth = _this$cachedValues3.viewWidth,
          contentWidth = _this$cachedValues3.contentWidth;
      return this.enableX && viewWidth < contentWidth;
    }
  }, {
    key: "isEnabledY",
    value: function isEnabledY() {
      var _this$cachedValues4 = this.cachedValues,
          viewHeight = _this$cachedValues4.viewHeight,
          contentHeight = _this$cachedValues4.contentHeight;
      return this.enableY && viewHeight < contentHeight;
    }
  }]);

  return Scroller;
}(PIXI.Container);

function getLocalPosition(displayobject) {
  var _displayobject$positi = displayobject.position,
      x = _displayobject$positi.x,
      y = _displayobject$positi.y;
  var width = displayobject.width,
      height = displayobject.height;
  var left = x;
  var right = x + width;
  var top = y;
  var bottom = y + height;
  return {
    left: left,
    right: right,
    top: top,
    bottom: bottom
  };
}

export default Scroller;
//# sourceMappingURL=Scroller.js.map