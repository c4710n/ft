class Component {
  constructor() {
    this.added = false
    this.displayObject = null
    this.meta = {}
  }

  onAdded(displayObject) {
    this.displayObject = displayObject
  }

  // eslint-disable-next-line
  onRemoved(displayObject) {
    this.displayObject = null
  }

  // onUpdate() {}
}

export default Component
