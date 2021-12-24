import "core-js/modules/es.object.define-property.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PlainStore = /*#__PURE__*/function () {
  function PlainStore() {
    _classCallCheck(this, PlainStore);

    this._store = {};
  }

  _createClass(PlainStore, [{
    key: "get",
    value: function get(key) {
      return this._store[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this._store[key] = value;
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return this._store;
    }
  }]);

  return PlainStore;
}();

export default PlainStore;
//# sourceMappingURL=PlainStore.js.map