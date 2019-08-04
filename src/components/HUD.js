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
  constructor(options) {
    super(options)

    this.system = app.systems.hud
    this.name = this.system.name
  }

  setMeta({ left, right, top, bottom } = {}) {
    const meta = {}

    if (left !== undefined) meta.left = left
    if (right !== undefined) meta.right = right
    if (top !== undefined) meta.top = top
    if (bottom !== undefined) meta.bottom = bottom

    this.meta = meta
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
