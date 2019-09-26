import Component from './Component'
import { Graphics } from '../display'

class HitAreaInspector extends Component {
  constructor() {
    super()

    const outline = new Graphics()
    this.outline = outline
  }

  onUpdate() {
    const { displayObject, outline } = this
    const { hitArea } = displayObject

    if (hitArea) {
      if (!outline.added) {
        displayObject.addChild(outline)
      }

      outline.clear()
      const { x, y, width, height } = hitArea
      outline.beginFill(0xde3249, 0.5)
      outline.drawRect(x, y, width, height)
    } else {
      if (outline.added) {
        displayObject.removeChild(outline)
      }
    }
  }
}

export default HitAreaInspector
