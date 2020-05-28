import Cookies from 'js-cookie'
import Parameter from 'parameter'

class CookieStore {
  constructor() {
    this.validator = new Parameter()
  }

  get(key, default_value) {
    return Cookies.get(key) || default_value
  }

  set(key, value) {
    Cookies.set(key, value)
  }
}

export default CookieStore
