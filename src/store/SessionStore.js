class SessionStore {
  constructor() {
    this._store = {}
  }

  get(key, default_value) {
    return this._store[key] || default_value
  }

  set(key, value) {
    this._store[key] = value
  }
}

export default SessionStore
