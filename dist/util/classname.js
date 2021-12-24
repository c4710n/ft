import "core-js/modules/es.function.name.js";

/**
 * Get class name of a given instance.
 *
 * @param {Object} instance a instance.
 * @return {string} the name of instance's class.
 */
function classname(instance) {
  return instance.constructor.name;
}

export default classname;
//# sourceMappingURL=classname.js.map