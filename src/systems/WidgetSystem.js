import { FT } from '../core'
import { Widget } from '../components'
import System from './System'

/**
 * System for Widget component.
 */
class WidgetSystem extends System {
  update() {
    this.entities.forEach(entity => {
      const widget = entity.components.find(
        component => component instanceof Widget
      )

      if (!widget) return

      const { meta } = widget

      this.position(entity, meta)
    })
  }

  position(entity, meta) {
    let $x, $y
    const { left, right, top, bottom, percentage } = meta
    const { viewport } = FT

    if (left !== undefined) {
      const offset = percentage ? viewport.width * left : left
      $x = viewport.left + offset
    }

    if (right !== undefined) {
      const offset = percentage ? viewport.width * right : right
      $x = viewport.right - offset
    }

    if (top !== undefined) {
      const offset = percentage ? viewport.height * top : top
      $y = viewport.top + offset
    }

    if (bottom !== undefined) {
      const offset = percentage ? viewport.height * bottom : bottom
      $y = viewport.bottom - offset
    }

    if ($x) entity.x = $x
    if ($y) entity.y = $y
  }
}

export default WidgetSystem
