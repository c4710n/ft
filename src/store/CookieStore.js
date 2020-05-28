import Cookies from 'js-cookie'

class CookieStore {
  get(key, default_value) {
    return Cookies.get(key) || default_value
  }

  set(key, value) {
    Cookies.set(key, value)
  }
}

export default CookieStore
