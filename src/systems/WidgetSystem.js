import { FT } from '#/core'
import { Widget } from '#/components'
import System from './System'

class WidgetSystem extends System {
  update() {
    this.entities.filter(entity => {
      const widget = entity.components.find(
        component => component instanceof Widget
      )

      if (!widget) return

      let $x, $y
      const { left, right, top, bottom } = widget.meta
      const { bounds } = FT.stage

      if (left !== undefined) $x = bounds.left + left
      if (right !== undefined) $x = bounds.right - right
      if (top !== undefined) $y = bounds.top + top
      if (bottom !== undefined) $y = bounds.bottom - bottom

      if ($x) entity.x = $x
      if ($y) entity.y = $y
    })
  }
}

export default WidgetSystem
