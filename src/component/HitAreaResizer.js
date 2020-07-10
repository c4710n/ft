import { PIXI } from '../core'
import Component from './Component'

class HitAreaResizer extends Component {
  constructor(size = 2) {
    super()

    this.name = 'hitarea-resizer'
    this.size = size
  }

  onAdded(displayObject) {
    const { size } = this

    const { width, height } = displayObject
    const hitArea = new PIXI.Rectangle(
      width * (0.5 - size / 2 - displayObject.originX),
      height * (0.5 - size / 2 - displayObject.originY),
      width * size,
      height * size
    )

    displayObject.hitArea = hitArea
  }
}

export default HitAreaResizer
