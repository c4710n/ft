import app from '../app'
import Component from './Component'

/**
 * A component for positioning display object according bounds of viewport.
 */
class HUD extends Component {
  /**
   * @param {Object} options
   * @param {number} options.left left position for bounds.
   * @param {number} options.right right position for bounds.
   * @param {number} options.top top position for bounds.
   * @param {number} options.bottom bottom position for bounds.
   */
  constructor(options = {}) {
    super(options)

    this.system = app.systems.hud
    this.name = this.system.name

    const { left, right, top, bottom } = options
    if (left !== undefined) this.left = left
    if (right !== undefined) this.right = right
    if (top !== undefined) this.top = top
    if (bottom !== undefined) this.bottom = bottom
  }

  // eslint-disable-next-line
  onAdded(displayObject) {
    this.system.addEntity(displayObject)
  }

  // eslint-disable-next-line
  onRemoved(displayObject) {
    this.system.removeEntity(displayObject)
  }
}

export default HUD
