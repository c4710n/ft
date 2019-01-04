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

      const { meta } = widget
      const { type } = meta
      if (type === 'device') {
        this.setDeviceWidget(entity, meta)
      } else {
        this.setBoundsWidget(entity, meta)
      }
    })
  }

  setDeviceWidget(entity, meta) {
    let $x, $y
    const { x, y } = meta
    const { device } = FT.stage

    if (x !== undefined) $x = device.width * x
    if (y !== undefined) $y = device.height * y

    if ($x) entity.x = $x
    if ($y) entity.y = $y
  }

  setBoundsWidget(entity, meta) {
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
}

export default WidgetSystem
