import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.object.define-property.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import patch from './patch';
import { PIXI, styleDOM } from './core';
import { RenderSystem, HUDSystem, TweenSystem, ScaleSystem, SoundSystem, VisibilitySystem, ResizeSystem } from './systems';
import ResManager from './res/ResManager';
import AdvancedResManager from './res/AdvancedResManager';
import SceneManager from './scene/SceneManager';
patch();
var autoDetectRenderer = PIXI.autoDetectRenderer,
    RenderTexture = PIXI.RenderTexture;
/**
 * Commander for framework.
 */

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.container = null;
    this.ticker = new PIXI.Ticker();
    this.stage = new PIXI.Container();
    this.systems = {}; // default instances of managers

    this.rm = ResManager["default"];
    this.arm = AdvancedResManager["default"];
    this.sm = SceneManager["default"]; // place to hold global references

    this.shared = {};
  }
  /**
   * Prepare for start.
   *
   * @param {string} selector - selector of DOM container.
   * @param {Object} options
   * @param {number} [options.renderer] - renderer's default options.
   * @param {string} [options.backgroundColor='#ffffff'] - background of DOM container.
   */


  _createClass(App, [{
    key: "init",
    value: function init(dom, options) {
      this.container = new styleDOM(dom, options.container);
      this.addSystem(new RenderSystem(options.render));
      this.addSystem(new HUDSystem());
      this.addSystem(new TweenSystem());
      this.addSystem(new ScaleSystem(options.scale));
      this.addSystem(new SoundSystem());
      this.addSystem(new VisibilitySystem());
      this.addSystem(new ResizeSystem());
      this.enqueueSystems();
      return this;
    }
  }, {
    key: "sharedRenderer",
    get: function get() {
      if (!this.shared.renderer) {
        this.shared.renderer = autoDetectRenderer();
      }

      return this.shared.renderer;
    }
  }, {
    key: "sharedRenderTexture",
    get: function get() {
      if (!this.shared.renderTexture) {
        this.shared.renderTexture = RenderTexture.create(0, 0);
      }

      return this.shared.renderTexture;
    }
    /**
     * @access private
     */

  }, {
    key: "addSystem",
    value: function addSystem(system) {
      this.systems[system.name] = system;
    }
    /**
     * @access private
     */

  }, {
    key: "enqueueSystems",
    value: function enqueueSystems() {
      var systems = Object.values(this.systems);

      for (var _i = 0, _systems = systems; _i < _systems.length; _i++) {
        var system = _systems[_i];
        this.ticker.add(system.update, system, system.updatePriority);
      }
    }
    /**
     * start ticker.
     */

  }, {
    key: "start",
    value: function start() {
      this.ticker.start();
    }
    /**
     * stop ticker.
     */

  }, {
    key: "stop",
    value: function stop() {
      this.ticker.stop();
    }
  }]);

  return App;
}();

var app = new App();
export default app;
//# sourceMappingURL=app.js.map