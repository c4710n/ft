import { FT } from '../core'
import { System } from '../ecs'

class WidgetSystem extends System {
  test(entity) {
    return !!entity.components.widget
  }

  update(entity) {
    const { top, bottom, left, right } = entity.components.widget
    const { bounds } = FT.stage

    let x, y
    if (top !== undefined) y = bounds.top + top
    if (bottom !== undefined) y = bounds.bottom - bottom
    if (left !== undefined) x = bounds.left + left
    if (right !== undefined) x = bounds.right - right

    entity.position.set(x, y)
  }
}

export default WidgetSystem
