function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "regenerator-runtime/runtime.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.is-array.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.sort.js";
import "core-js/modules/es.number.parse-int.js";
import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.object.define-property.js";
import "core-js/modules/es.object.create.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
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

import { PIXI } from '../core';
import fontLoader from './loader/font';
import { patch as patchSpritesheetLoader } from './loader/spritesheet';
import { classname } from '../util';
patchSpritesheetLoader();
var $res;
/**
 * Resource manager built on the loader provided by PIXI.
 *
 * In FT, resources for `ResManager` must be registered in advance.
 * Because of that, you need to create a standalone module for `ResManager` in
 * order to achieve this.
 *
 * @example
 * // register-resources.js
 * import { ResManager } from 'ft'
 * import resources from '!val-loader?basedir=./res!ft/res/scan.val'
 * ResManager.register(resources)
 *
 * // Above code should be placed in a standalone file,
 * // Then, import `register-resources.js` after importing FT.
 * import { FT } from 'ft'
 * import './register-resources'
 */

var ResManager = /*#__PURE__*/function (_PIXI$Loader) {
  _inherits(ResManager, _PIXI$Loader);

  var _super = _createSuper(ResManager);

  function ResManager() {
    var _this;

    _classCallCheck(this, ResManager);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.queuedResources = [];

    _this.use(fontLoader);

    return _this;
  }
  /**
   * Register metadata of resources generated by res/scan.val.js
   */


  _createClass(ResManager, [{
    key: "res",
    get: function get() {
      return $res;
    }
    /**
     * Get url of resource.
     */

  }, {
    key: "url",
    value: function url() {
      var _$res;

      return (_$res = $res).url.apply(_$res, arguments);
    }
  }, {
    key: "addImage",
    value: function addImage(name) {
      this.queuedResources.push({
        name: name,
        type: 'image'
      });
      return name;
    }
  }, {
    key: "addFont",
    value: function addFont(name) {
      this.queuedResources.push({
        name: name,
        type: 'webfont'
      });
      name = name.replace('.', '');
      return name;
    }
  }, {
    key: "addSound",
    value: function addSound(name) {
      this.queuedResources.push({
        name: name,
        type: 'sound'
      });
      return name;
    }
  }, {
    key: "addJSON",
    value: function addJSON(name) {
      this.queuedResources.push({
        name: name,
        type: 'json'
      });
      return name;
    }
  }, {
    key: "addSpritesheet",
    value: function addSpritesheet(name) {
      this.queuedResources.push({
        name: name,
        type: 'spritesheet'
      });
      return name;
    }
  }, {
    key: "load",
    value: function load() {
      var _iterator = _createForOfIteratorHelper(this.queuedResources),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var resource = _step.value;
          var type = resource.type,
              name = resource.name;
          if (this.resources[name]) continue;

          switch (type) {
            case 'spritesheet':
              this.loadSpritesheet(name);
              break;

            default:
              this.loadGeneralResource(name);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return _get(_getPrototypeOf(ResManager.prototype), "load", this).call(this);
    }
    /* general loader for loading image, webfont, sound, json */

  }, {
    key: "loadGeneralResource",
    value: function loadGeneralResource(name) {
      this.add.apply(this, _toConsumableArray($res.nu(name)));
    }
  }, {
    key: "loadSpritesheet",
    value: function loadSpritesheet(name) {
      var json = this.url(name, {
        type: 'json'
      });
      var image = this.url(name, {
        type: 'image'
      });
      this.add(name, json, {
        data: {
          meta: {
            image: image
          }
        },
        metadata: {
          image: image
        }
      });
    }
    /**
     * Get a texture by name.
     */

  }, {
    key: "texture",
    value: function texture(name) {
      var resource = this.resources[name];

      if (!resource) {
        throw new Error("[".concat(classname(this), "] missing texture - ").concat(name));
      } else {
        return resource.texture;
      }
    }
    /**
     * Get sub texture by name.
     */

  }, {
    key: "subTexture",
    value: function subTexture(names, subname) {
      var _names = [];

      if (Array.isArray(names)) {
        _names = names;
      } else {
        var name = names;

        _names.push(name);
      }

      var _iterator2 = _createForOfIteratorHelper(_names),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _name = _step2.value;
          var resource = this.resources[_name];

          if (!resource) {
            throw new Error("[".concat(classname(this), "] missing texture - ").concat(_name));
          } else {
            var subtexture = resource.textures[subname];

            if (subtexture) {
              return subtexture;
            } else {
              continue;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      throw new Error("[".concat(classname(this), "] missing subtexture - ").concat(subname));
    }
    /**
     * Get textures from spritesheets.
     */

  }, {
    key: "spritesheetTextures",
    value: function spritesheetTextures(names) {
      var _names = [];

      if (Array.isArray(names)) {
        _names = names;
      } else {
        var name = names;

        _names.push(name);
      }

      var texturesMap = [];

      var _iterator3 = _createForOfIteratorHelper(_names),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _this$resources$_name;

          var _name2 = _step3.value;
          var spritesheet = (_this$resources$_name = this.resources[_name2]) === null || _this$resources$_name === void 0 ? void 0 : _this$resources$_name.spritesheet;

          if (!spritesheet) {
            throw new Error("[".concat(classname(this), "] missing spritesheet - ").concat(_name2));
          }

          for (var _i = 0, _Object$entries = Object.entries(spritesheet.textures); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                _name3 = _Object$entries$_i[0],
                texture = _Object$entries$_i[1];

            texturesMap.push({
              name: _name3,
              texture: texture
            });
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var textures = texturesMap.sort(function (a, b) {
        var orderA = Number.parseInt(a.name.replace(/[^0-9]/g, ''));
        var orderB = Number.parseInt(b.name.replace(/[^0-9]/g, ''));

        if (orderA > orderB) {
          return 1;
        }

        if (orderA < orderB) {
          return -1;
        }

        return 0;
      }).map(function (i) {
        return i.texture;
      });
      return textures;
    }
    /**
     * Get a sound by name.
     */

  }, {
    key: "sound",
    value: function sound(name) {
      var resource = this.resources[name];

      if (!resource) {
        throw new Error("[".concat(classname(this), "] missing sound - ").concat(name));
      } else {
        return resource.sound;
      }
    }
    /**
     * Add a JSON data by name
     */

  }, {
    key: "json",
    value: function json(name) {
      var resource = this.resources[name];

      if (!resource) {
        throw new Error("[".concat(classname(this), "] missing json - ").concat(name));
      } else {
        return resource.data;
      }
    }
  }], [{
    key: "register",
    value: function register(res) {
      $res = res;
    }
  }, {
    key: "loadImage",
    value: function () {
      var _loadImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var name, $rm;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = 'current';
                $rm = new ResManager();
                $rm.add(name, url);
                _context.next = 5;
                return new Promise(function (resolve, reject) {
                  $rm.onComplete.add(resolve);
                  $rm.onError.add(reject);
                  $rm.load();
                });

              case 5:
                return _context.abrupt("return", $rm.texture(name));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadImage(_x) {
        return _loadImage.apply(this, arguments);
      }

      return loadImage;
    }()
  }]);

  return ResManager;
}(PIXI.Loader);

ResManager["default"] = new ResManager();
export default ResManager;
//# sourceMappingURL=ResManager.js.map