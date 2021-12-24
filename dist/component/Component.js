import "core-js/modules/es.object.define-property.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Basic class for all components.
 *
 * @interface
 */
var Component = /*#__PURE__*/function () {
  function Component(_options) {
    _classCallCheck(this, Component);

    /**
     * current component is added or not.
     */
    this.added = false;
    /**
     * the displayObject that current component added to.
     *
     * @type {DisplayObject}
     */

    this.displayObject = null;
  }
  /**
   * Hook will be called when component is added to displayObject.
   *
   * @param {DisplayObject} displayObject
   */


  _createClass(Component, [{
    key: "_onAdded",
    value: function _onAdded(displayObject) {
      this.displayObject = displayObject;

      if (this.onAdded) {
        this.onAdded(displayObject);
      }
    }
    /**
     * Hook will be called when component is removed from displayObject.
     *
     * @param {DisplayObject} displayObject
     */
    // eslint-disable-next-line

  }, {
    key: "_onRemoved",
    value: function _onRemoved(displayObject) {
      if (this.onRemoved) {
        this.onRemoved(displayObject);
      }

      this.displayObject = null;
    }
  }]);

  return Component;
}();

export default Component;
//# sourceMappingURL=Component.js.map