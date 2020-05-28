import Parameter from 'parameter'

class SessionStore {
  constructor() {
    this._store = {}
    this.validator = new Parameter()
  }

  get(key, default_value) {
    return this._store[key] || default_value
  }

  set(key, value) {
    this._store[key] = value
  }

  inspect() {
    return this._store
  }
}

export default SessionStore
