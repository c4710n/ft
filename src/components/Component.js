/**
 * Basic class for all components.
 *
 * @interface
 */
class Component {
  constructor(_options) {
    /**
     * current component is added or not.
     */
    this.added = false

    /**
     * the displayObject that current component added to.
     *
     * @type {DisplayObject}
     */
    this.displayObject = null
  }

  /**
   * Hook will be called when component is added to displayObject.
   *
   * @param {DisplayObject} displayObject
   */
  _onAdded(displayObject) {
    this.displayObject = displayObject

    if (this.onAdded) {
      this.onAdded(displayObject)
    }
  }

  /**
   * Hook will be called when component is removed from displayObject.
   *
   * @param {DisplayObject} displayObject
   */
  // eslint-disable-next-line
  _onRemoved(displayObject) {
    if (this.onRemoved) {
      this.onRemoved(displayObject)
    }

    this.displayObject = null
  }
}

export default Component
