import app from '../app'
import { PIXI } from '../core'

/**
 * A mask whose size is equal to viewport's size.
 */
class Mask extends PIXI.Graphics {
  /**
   * @param {Object} options
   * @param {number} options.color mask's color
   */
  constructor({ color = 0x000000, alpha = 0.5 } = {}) {
    super()

    this.beginFill(color)
    const { width, height } = app.size
    this.drawRect(0, 0, width, height)
    this.endFill()

    this.alpha = alpha
  }
}

export default Mask
