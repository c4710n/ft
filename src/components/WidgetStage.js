import Widget from './Widget'

/**
 * A component for positioning display object according bounds of stage.
 */
class WidgetStage extends Widget {
  /**
   * @param {Object} options
   * @param {number} options.left left position for bounds.
   * @param {number} options.right right position for bounds.
   * @param {number} options.top top position for bounds.
   * @param {number} options.bottom bottom position for bounds.
   */
  constructor({ left, right, top, bottom } = {}) {
    super()

    if (left !== undefined) this.meta.left = left
    if (right !== undefined) this.meta.right = right
    if (top !== undefined) this.meta.top = top
    if (bottom !== undefined) this.meta.bottom = bottom
  }
}

export default WidgetStage
