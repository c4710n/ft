import { FT } from '#/core'
import PIXI from '#/pixi'

const { Graphics } = PIXI

class Mask extends Graphics {
  constructor({ x = 0, y = 0, color = 0x00000 } = {}) {
    super()

    this.beginFill(color)
    const { width, height } = FT.stage
    this.drawRect(x, y, width, height)
    this.endFill()
  }
}

export default Mask
