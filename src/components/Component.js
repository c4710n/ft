class Component {
  constructor() {
    this.added = false
    this.displayObject = null
    this.meta = {}
  }

  // eslint-disable-next-line
  onAdded(displayObject) {
    this.displayObject = displayObject
  }

  // eslint-disable-next-line
  onRemoved(displayObject) {
    this.displayObject = null
  }
}

export default Component
