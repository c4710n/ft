class PlainStore {
  constructor() {
    this._store = {}
  }

  get(key, default_value = null) {
    return this._store[key] || default_value
  }

  set(key, value) {
    this._store[key] = value
  }

  inspect() {
    return this._store
  }
}

export default PlainStore
