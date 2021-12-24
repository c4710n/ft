import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.object.define-property.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import { splice } from '../util/fast';
import { PIXI } from '../core';
var UPDATE_PRIORITY = PIXI.UPDATE_PRIORITY;
/**
 * Basic class for system.
 */

export { UPDATE_PRIORITY };

var System = /*#__PURE__*/function () {
  /**
   * @param [frequency=1] {number} frequency of execution.
   */
  function System(name) {
    var updatePriority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : UPDATE_PRIORITY.NORMAL;

    _classCallCheck(this, System);

    this.name = name;
    this.updatePriority = updatePriority;
    /**
     * Entities of current system.
     *
     * @property {Array} entities
     */

    this.entities = [];
  }

  _createClass(System, [{
    key: "addEntity",
    value: function addEntity(entity) {
      this.entities.push(entity);
    }
  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      var index = this.entities.indexOf(entity);

      if (index !== -1) {
        splice(this.entities, index, 1);
      }
    }
    /**
     * @override
     */
    // eslint-disable-next-line no-unused-vars

  }, {
    key: "update",
    value: function update(dt) {}
  }]);

  return System;
}();

export default System;
//# sourceMappingURL=System.js.map