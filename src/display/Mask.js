import { FT } from '#/core'
import PIXI from '#/pixi'

/**
 * A mask whose size is equal to viewport's size.
 *
 * @example
 * const mask = FT.create(Mask, { color: 0xff0000 })
 * container.addChild(mask)
 */
class Mask extends PIXI.Graphics {
  /**
   * @param {Object} options
   * @param {number} options.color mask's color
   */
  constructor({ x = 0, y = 0, color = 0x00000 } = {}) {
    super()

    this.beginFill(color)
    const { width, height } = FT.stage
    this.drawRect(x, y, width, height)
    this.endFill()
  }
}

export default Mask
