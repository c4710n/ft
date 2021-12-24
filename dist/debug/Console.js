import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.object.define-property.js";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { qs } from '../util';
/**
 * Load vConsole according querystring. When specified pattern is found in
 * querystring, vConsole will be enabled.
 *
 * @example
 * new Console('debug')
 * // After adding this line, when you visit https://example.com?debug,
 * // vConsole will be loaded
 *
 * @see https://github.com/Tencent/vConsole
 */

var Console = /*#__PURE__*/_createClass(
/**
 * @param {string} [field='debug'] field will be searched in querystring
 */
function Console() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'debug';

  _classCallCheck(this, Console);

  var qo = qs.parse();
  var hasField = qo[field] !== undefined;

  if (hasField) {
    import('vconsole').then(function (_ref) {
      var VConsole = _ref["default"];
      new VConsole();
    });
  }
});

export default Console;
//# sourceMappingURL=Console.js.map