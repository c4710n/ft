import { PIXI } from '../core'

class Rect extends PIXI.Graphics {
  /**
   * @param {Object} options
   * @param {number} options.color
   */
  constructor(width, height, { color = 0x000000 } = {}) {
    super()

    this.beginFill(color)
    this.drawRect(0, 0, width, height)
    this.endFill()
  }
}

export default Rect
