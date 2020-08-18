class PlainStore {
  constructor() {
    this._store = {}
  }

  get(key) {
    return this._store[key]
  }

  set(key, value) {
    this._store[key] = value
  }

  inspect() {
    return this._store
  }
}

export default PlainStore
