import { FT } from '#/core'
import { Widget } from '#/components'
import System from './System'

class WidgetSystem extends System {
  update() {
    this.entities.forEach(entity => {
      const widget = entity.components.find(
        component => component instanceof Widget
      )

      if (!widget) return

      const { meta } = widget

      this.setWidgetStage(entity, meta)
    })
  }

  setWidgetStage(entity, meta) {
    let $x, $y
    const { left, right, top, bottom } = meta
    const { bounds } = FT.stage

    if (left !== undefined) $x = bounds.left + left
    if (right !== undefined) $x = bounds.right - right
    if (top !== undefined) $y = bounds.top + top
    if (bottom !== undefined) $y = bounds.bottom - bottom

    if ($x) entity.x = $x
    if ($y) entity.y = $y
  }

  setWidgetViewport(entity, meta) {
    let $x, $y
    const { left, right, top, bottom } = meta
    const { viewport } = FT

    if (left !== undefined) $x = viewport.left + left
    if (right !== undefined) $x = viewport.right - right
    if (top !== undefined) $y = viewport.top + top
    if (bottom !== undefined) $y = viewport.bottom - bottom

    if ($x) entity.x = $x
    if ($y) entity.y = $y
  }
}

export default WidgetSystem
