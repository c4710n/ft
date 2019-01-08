import $qs from 'qs'

/**
 * Parse querystring of current URL.
 *
 * @return {Object} parsed querystring.
 */
export function parse() {
  const query = location.search.replace('?', '')
  return $qs.parse(query)
}

export default {
  parse,
}
