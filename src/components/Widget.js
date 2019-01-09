import { FT } from '#/core'
import { WidgetSystem } from '#/systems'
import { classname } from '#/utils'
import Component from './Component'

/**
 * Basic class for widgets.
 *
 * @interface
 */
class Widget extends Component {
  constructor() {
    super()

    this.system = FT.systems.find(system => system instanceof WidgetSystem)

    if (!this.system) {
      throw new Error(`[${classname(this)}] can't find usable WidgetSystem`)
    }
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
