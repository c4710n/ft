import "regenerator-runtime/runtime.js";

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.for-each.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.array.is-array.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.function.bind.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import app from '../app';
import { classname, qs } from '../util';
import state from '../state';

var SceneManager = /*#__PURE__*/function () {
  function SceneManager() {
    _classCallCheck(this, SceneManager);

    /**
     * Store all registered scenes.
     * @access private
     */
    this.registeredScenes = [];
    /**
     * Store currentc scene
     * @access private
     */

    this.currentScene = null;
  }
  /**
   * Register a scene.
   * @param {string} name name of scene
   * @param {Scene} Class subclass of {@link Scene}
   */


  _createClass(SceneManager, [{
    key: "register",
    value: function register(name, Class) {
      this.registeredScenes.push({
        name: name,
        Class: Class
      });
    }
    /**
     * Start a scene with cleaning up other scenes.
     */

  }, {
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
        var _ref,
            _ref$args,
            args,
            _ref$unique,
            unique,
            _ref$oneOff,
            oneOff,
            index,
            translate,
            _this$getRegisteredSc,
            Class,
            $name,
            nextScene,
            currentScene,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref$args = _ref.args, args = _ref$args === void 0 ? [] : _ref$args, _ref$unique = _ref.unique, unique = _ref$unique === void 0 ? false : _ref$unique, _ref$oneOff = _ref.oneOff, oneOff = _ref$oneOff === void 0 ? false : _ref$oneOff, index = _ref.index, translate = _ref.translate;

                if (!(unique && this.get(name))) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                state.allowInteraction = false; // find registered scene, then create an instance of the scene

                _this$getRegisteredSc = this.getRegisteredScene(name), Class = _this$getRegisteredSc.Class, $name = _this$getRegisteredSc.name;
                nextScene = _construct(Class, [$name].concat(_toConsumableArray(args)));
                nextScene.oneOff = oneOff; // add instance of scene into stage

                if (typeof index === 'number') {
                  app.stage.addChildAt(nextScene, index);
                } else {
                  app.stage.addChild(nextScene);
                }

                currentScene = this.currentScene;

                if (!translate) {
                  _context.next = 14;
                  break;
                }

                _context.next = 12;
                return translate(currentScene, nextScene);

              case 12:
                _context.next = 19;
                break;

              case 14:
                if (!currentScene) {
                  _context.next = 17;
                  break;
                }

                _context.next = 17;
                return currentScene._translateOut();

              case 17:
                _context.next = 19;
                return nextScene._translateIn();

              case 19:
                this.currentScene = nextScene;
                this.cleanup();
                state.allowInteraction = true;
                return _context.abrupt("return", true);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x) {
        return _load.apply(this, arguments);
      }

      return load;
    }()
    /**
     * Start a scene without cleaning up other scenes.
     */

  }, {
    key: "launch",
    value: function () {
      var _launch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
        var _ref2,
            _ref2$args,
            args,
            _ref2$unique,
            unique,
            _ref2$oneOff,
            oneOff,
            index,
            _this$getRegisteredSc2,
            Class,
            $name,
            launchedScene,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref2$args = _ref2.args, args = _ref2$args === void 0 ? [] : _ref2$args, _ref2$unique = _ref2.unique, unique = _ref2$unique === void 0 ? false : _ref2$unique, _ref2$oneOff = _ref2.oneOff, oneOff = _ref2$oneOff === void 0 ? false : _ref2$oneOff, index = _ref2.index;

                if (!(unique && this.get(name))) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                state.allowInteraction = false;
                _this$getRegisteredSc2 = this.getRegisteredScene(name), Class = _this$getRegisteredSc2.Class, $name = _this$getRegisteredSc2.name;
                launchedScene = _construct(Class, [$name].concat(_toConsumableArray(args)));
                launchedScene.oneOff = oneOff;
                launchedScene.launched = true;

                if (typeof index === 'number') {
                  app.stage.addChildAt(launchedScene, index);
                } else {
                  app.stage.addChild(launchedScene);
                }

                _context2.next = 11;
                return launchedScene._translateIn();

              case 11:
                state.allowInteraction = true;
                return _context2.abrupt("return", true);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function launch(_x2) {
        return _launch.apply(this, arguments);
      }

      return launch;
    }()
  }, {
    key: "launchSync",
    value: function launchSync(name) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$args = _ref3.args,
          args = _ref3$args === void 0 ? [] : _ref3$args,
          _ref3$unique = _ref3.unique,
          unique = _ref3$unique === void 0 ? false : _ref3$unique,
          _ref3$oneOff = _ref3.oneOff,
          oneOff = _ref3$oneOff === void 0 ? false : _ref3$oneOff,
          index = _ref3.index;

      if (unique && this.get(name)) return;
      state.allowInteraction = false;

      var _this$getRegisteredSc3 = this.getRegisteredScene(name),
          Class = _this$getRegisteredSc3.Class,
          $name = _this$getRegisteredSc3.name;

      var launchedScene = _construct(Class, [$name].concat(_toConsumableArray(args)));

      launchedScene.oneOff = oneOff;
      launchedScene.launched = true;

      if (typeof index === 'number') {
        app.stage.addChildAt(launchedScene, index);
      } else {
        app.stage.addChild(launchedScene);
      }

      state.allowInteraction = true;
      return true;
    }
  }, {
    key: "setCurrent",
    value: function () {
      var _setCurrent = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(nameOrScene) {
        var scene;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                scene = this.get(nameOrScene);
                scene.launched = false;
                this.currentScene = scene;

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setCurrent(_x3) {
        return _setCurrent.apply(this, arguments);
      }

      return setCurrent;
    }()
    /**
     * Load scene according `scene` field in querystring
     */

  }, {
    key: "qsload",
    value: function qsload() {
      var qo = qs.parse();
      var name = qo.__scene__;

      if (name) {
        return this.load(name);
      } else {
        return false;
      }
    }
    /**
     * Cleanup useless actived scenes
     * @access private
     */

  }, {
    key: "cleanup",
    value: function cleanup() {
      var _this = this;

      var scenes = app.stage.children;
      scenes.forEach(function (scene) {
        if (scene.launched || scene === _this.currentScene) {
          return;
        }

        app.stage.removeChild(scene);

        if (!scene.persistent) {
          scene.destroy({
            children: true,
            texture: scene.oneOff,
            baseTexture: scene.oneOff
          });
        }
      });
    }
    /**
     * Unload a scene by name explicitly.
     */

  }, {
    key: "unload",
    value: function () {
      var _unload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(name) {
        var _ref4,
            _ref4$destroy,
            destroy,
            scene,
            _args4 = arguments;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref4 = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {}, _ref4$destroy = _ref4.destroy, destroy = _ref4$destroy === void 0 ? true : _ref4$destroy;
                scene = this.get(name);

                if (!scene) {
                  _context4.next = 9;
                  break;
                }

                state.allowInteraction = false;
                _context4.next = 6;
                return scene._translateOut();

              case 6:
                app.stage.removeChild(scene);

                if (destroy) {
                  scene.destroy({
                    children: true,
                    texture: scene.oneOff,
                    baseTexture: scene.oneOff
                  });
                }

                state.allowInteraction = true;

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function unload(_x4) {
        return _unload.apply(this, arguments);
      }

      return unload;
    }()
    /**
     * Get a registered scene.
     */

  }, {
    key: "getRegisteredScene",
    value: function getRegisteredScene(name) {
      var scene = this.registeredScenes.find(function (s) {
        return s.name === name;
      });

      if (!scene) {
        throw "[".concat(classname(this), "] failed to get unregistered scene - ").concat(name);
      }

      return scene;
    }
    /**
     * Get a started scene by name or reference.
     */

  }, {
    key: "get",
    value: function get(nameOrScene) {
      var scene;
      var scenes = app.stage.children;

      if (typeof nameOrScene === 'string') {
        var providedSceneName = nameOrScene;
        scene = scenes.find(function (s) {
          return s.name === providedSceneName;
        });
      } else {
        var providedScene = nameOrScene;
        scene = scenes.find(function (s) {
          return s === providedScene;
        });
      }

      return scene;
    }
  }]);

  return SceneManager;
}();

SceneManager["default"] = new SceneManager();
export default SceneManager;
//# sourceMappingURL=SceneManager.js.map