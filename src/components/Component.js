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
  onAdded(displayObject) {
    this.displayObject = displayObject
  }

  /**
   * Hook will be called when component is removed from displayObject.
   *
   * @param {DisplayObject} displayObject
   */
  // eslint-disable-next-line
  onRemoved(displayObject) {
    this.displayObject = null
  }
}

export default Component
