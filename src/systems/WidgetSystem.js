import { FT } from '#/core'
import { System } from '#/ecs'

class WidgetSystem extends System {
  test(entity) {
    return !!entity.components.display && !!entity.components.widget
  }

  update(entity) {
    let $x, $y
    const { display, widget } = entity.components
    const { top, bottom, left, right } = widget
    const { bounds } = FT.stage

    if (left !== undefined) $x = bounds.left + left
    if (right !== undefined) $x = bounds.right - right
    if (top !== undefined) $y = bounds.top + top
    if (bottom !== undefined) $y = bounds.bottom - bottom

    if ($x) display.position.x = $x
    if ($y) display.position.y = $y
  }
}

export default WidgetSystem
