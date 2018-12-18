import $qs from 'qs'

export function parse() {
  const query = location.search.replace('?', '')
  return $qs.parse(query)
}

export default {
  parse,
}
