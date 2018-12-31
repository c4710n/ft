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
  constructor({ color = 0x00000, alpha = 0.5 } = {}) {
    super()

    this.beginFill(color)
    const { left, top, width, height } = FT.stage.bounds
    this.drawRect(left, top, width, height)
    this.endFill()

    this.alpha = alpha
  }

  onUpdate() {
    const { left, top, width, height } = FT.stage.bounds
    this.x = left
    this.y = top
    this.width = width
    this.height = height
  }
}

export default Mask
