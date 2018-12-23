import { FT } from '#/core'
import { WidgetSystem } from '#/systems'
import { classname } from '#/utils'
import Component from './Component'

class Widget extends Component {
  constructor({ left, right, top, bottom } = {}) {
    super()

    this.system = FT.systems.find(system => system instanceof WidgetSystem)

    if (!this.system) {
      throw new Error(`[${classname(this)}] can't find usable WidgetSystem`)
    }

    if (left !== undefined) this.meta.left = left
    if (right !== undefined) this.meta.right = right
    if (top !== undefined) this.meta.top = top
    if (bottom !== undefined) this.meta.bottom = bottom
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

export default Widget
