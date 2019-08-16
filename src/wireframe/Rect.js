import { Graphics } from '../display'
import { black } from './color'

class Rect extends Graphics {
  constructor(width, height, color = black) {
    super()

    this.beginFill(color, 1)
    this.drawRoundedRect(0, 0, width, height)
    this.endFill()
  }
}

export default Rect
