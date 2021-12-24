import "core-js/modules/es.object.define-property.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import Cookies from 'js-cookie';
import Parameter from 'parameter';

var CookieStore = /*#__PURE__*/function () {
  function CookieStore() {
    _classCallCheck(this, CookieStore);

    this.validator = new Parameter();
  }

  _createClass(CookieStore, [{
    key: "get",
    value: function get(key, default_value) {
      return Cookies.get(key) || default_value;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      Cookies.set(key, value);
    }
  }]);

  return CookieStore;
}();

export default CookieStore;
//# sourceMappingURL=CookieStore.js.map