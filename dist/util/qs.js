import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.search.js";
import $qs from 'qs';
/**
 * Parse querystring of current URL.
 *
 * @return {Object} parsed querystring.
 */

export function parse() {
  var query = location.search.replace('?', '');
  return $qs.parse(query);
}
export default {
  parse: parse
};
//# sourceMappingURL=qs.js.map