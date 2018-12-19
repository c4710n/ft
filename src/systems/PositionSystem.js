import { FT } from '../core'
import { System } from '../ecs'

class PositionSystem extends System {
  test(entity) {
    return !!entity.components.position
  }

  update(entity) {
    let $x, $y
    const {
      anchor,
      top,
      bottom,
      left,
      right,
      x,
      y,
    } = entity.components.position
    const { bounds } = FT.stage

    // anchor
    entity.anchor.set(...anchor)

    // absolute position feature
    if (x !== undefined) $x = x
    if (y !== undefined) $y = y

    // widget-like position feature
    if (left !== undefined) $x = bounds.left + left
    if (right !== undefined) $x = bounds.right - right
    if (top !== undefined) $y = bounds.top + top
    if (bottom !== undefined) $y = bounds.bottom - bottom

    if ($x) entity.position.x = $x
    if ($y) entity.position.y = $y
  }
}

export default PositionSystem
