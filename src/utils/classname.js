/**
 * Get class name of a given instance.
 *
 * @param {Object} instance a instance.
 * @return {string} the name of instance's class.
 */
function classname(instance) {
  return instance.constructor.name
}

export default classname
