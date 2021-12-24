function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.function.bind.js";
import "core-js/modules/es.array.concat.js";
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

import { Ticker } from '@pixi/ticker';
import app from '../../app';
import System, { UPDATE_PRIORITY } from '../System';
import { Layer, PIXI } from '../../core';
import events from '../../events';
import state from '../../state';

var RenderSystem = /*#__PURE__*/function (_System) {
  _inherits(RenderSystem, _System);

  var _super = _createSuper(RenderSystem);

  function RenderSystem() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'auto' : _ref$type,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 750 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 1500 : _ref$height,
        _ref$transparent = _ref.transparent,
        transparent = _ref$transparent === void 0 ? true : _ref$transparent,
        _ref$antialias = _ref.antialias,
        antialias = _ref$antialias === void 0 ? false : _ref$antialias;

    _classCallCheck(this, RenderSystem);

    _this = _super.call(this, 'render', UPDATE_PRIORITY.LOW);
    _this.container = app.container;
    _this.width = width;
    _this.height = height;
    _this.size = _this.getSize();
    app.size = _this.size;
    var options = {
      width: width,
      height: height,
      transparent: transparent,
      antialias: antialias
    };

    if (type === 'webgl') {
      _this.renderer = new PIXI.Renderer(options);
    } else if (type === 'canvas') {
      _this.renderer = new PIXI.CanvasRenderer(options);
    } else {
      _this.renderer = PIXI.autoDetectRenderer(options);
    }

    app.renderer = _this.renderer;
    _this.view = _this.renderer.view;
    _this.view.style.zIndex = Layer.VIEW;
    _this.view.style.position = 'absolute';
    _this.view.style.width = '100%';
    _this.view.style.height = '100%';
    app.view = _this.view;
    _this.stage = app.stage;
    _this.stage.added = true; // in order to make patchDisplayObjectLifecycle work.

    _this.container.appendChild(_this.view);

    _this.remapInteraction();

    return _this;
  }
  /**
   * Resize stage.
   *
   * @param {number} width
   * @param {number} height
   */


  _createClass(RenderSystem, [{
    key: "resize",
    value: function resize(width, height) {
      this.width = width;
      this.height = height;
      this.updateSize();
      this.renderer.resize(width, height);
      events.resize.emit();
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var width = this.width,
          height = this.height;
      return {
        width: width,
        height: height,
        centerX: width / 2,
        centerY: height / 2,
        center: [width / 2, height / 2]
      };
    }
  }, {
    key: "updateSize",
    value: function updateSize() {
      var width = this.width,
          height = this.height;
      this.size.width = width;
      this.size.height = height;
      this.size.centerX = width / 2;
      this.size.centerY = height / 2;
      this.size.center = [width / 2, height / 2];
    }
  }, {
    key: "update",
    value: function update() {
      var stage = this.stage,
          renderer = this.renderer; // render stage

      renderer.render(stage);
    }
    /**
     * @access private
     */

  }, {
    key: "remapInteraction",
    value: function remapInteraction() {
      var container = this.container,
          renderer = this.renderer;
      var interaction = renderer.plugins.interaction;
      var normalizeToPointerData = interaction.normalizeToPointerData,
          processInteractive = interaction.processInteractive;
      interaction.autoPreventDefault = false;
      interaction.addEvents = addEvents.bind(interaction);

      interaction.normalizeToPointerData = function (event) {
        this.interactionDOMElement = event.target;
        return normalizeToPointerData.call(this, event);
      };

      interaction.processInteractive = function () {
        if (!state.allowInteraction) return;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return processInteractive.call.apply(processInteractive, [this].concat(args));
      };

      interaction.mapPositionToPoint = function (point, x, y) {
        var scale = app.systems.scale.position.scale;
        var rotate = app.systems.scale.rotate; // the unit of x, y is CSS pixel

        var resolutionMultiplier = 1.0 / this.resolution;
        var rect = container.getBoundingClientRect();

        if (rotate) {
          point.x = (y - rect.top) / scale * resolutionMultiplier;
          point.y = (rect.width - (x - rect.left)) / scale * resolutionMultiplier;
        } else {
          point.x = (x - rect.left) / scale * resolutionMultiplier;
          point.y = (y - rect.top) / scale * resolutionMultiplier;
        }
      }; // reset instance of InteractionManager


      interaction.setTargetElement(container, renderer.resolution);
    }
  }]);

  return RenderSystem;
}(System);

export default RenderSystem;
/**
 * OVERRIDES ORIGINAL PIXI CODE
 *
 * make sure touch events and mouse events aren't binded together.
 *
 * PIXI VERSION: 5.1.1
 * + https://github.com/pixijs/pixi.js/blob/40e1e4a12518ee067c6871dcdd930602346197de/packages/interaction/src/InteractionManager.js
 */

function addEvents() {
  if (!this.interactionDOMElement) {
    return;
  }

  Ticker.system.add(this.update, this, UPDATE_PRIORITY.INTERACTION);

  if (window.navigator.msPointerEnabled) {
    this.interactionDOMElement.style['-ms-content-zooming'] = 'none';
    this.interactionDOMElement.style['-ms-touch-action'] = 'none';
  } else if (this.supportsPointerEvents) {
    this.interactionDOMElement.style['touch-action'] = 'none';
  }
  /**
   * These events are added first, so that if pointer events are normalized, they are fired
   * in the same order as non-normalized events. ie. pointer event 1st, mouse / touch 2nd
   */


  if (this.supportsPointerEvents) {
    window.document.addEventListener('pointermove', this.onPointerMove, true);
    this.interactionDOMElement.addEventListener('pointerdown', this.onPointerDown, true); // pointerout is fired in addition to pointerup (for touch events) and pointercancel
    // we already handle those, so for the purposes of what we do in onPointerOut, we only
    // care about the pointerleave event

    this.interactionDOMElement.addEventListener('pointerleave', this.onPointerOut, true);
    this.interactionDOMElement.addEventListener('pointerover', this.onPointerOver, true);
    window.addEventListener('pointercancel', this.onPointerCancel, true);
    window.addEventListener('pointerup', this.onPointerUp, true);
  }

  if (this.supportsTouchEvents) {
    // always look directly for touch events so that we can provide original data
    // In a future version we should change this to being just a fallback and rely solely on
    // PointerEvents whenever available
    this.interactionDOMElement.addEventListener('touchstart', this.onPointerDown, true);
    this.interactionDOMElement.addEventListener('touchcancel', this.onPointerCancel, true);
    this.interactionDOMElement.addEventListener('touchend', this.onPointerUp, true);
    this.interactionDOMElement.addEventListener('touchmove', this.onPointerMove, true);
  } else {
    window.document.addEventListener('mousemove', this.onPointerMove, true);
    this.interactionDOMElement.addEventListener('mousedown', this.onPointerDown, true);
    this.interactionDOMElement.addEventListener('mouseout', this.onPointerOut, true);
    this.interactionDOMElement.addEventListener('mouseover', this.onPointerOver, true);
    window.addEventListener('mouseup', this.onPointerUp, true);
  }

  this.eventsAdded = true;
}
//# sourceMappingURL=index.js.map