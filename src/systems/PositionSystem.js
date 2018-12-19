import { FT } from '../core'
import { System } from '../ecs'

class PositionSystem extends System {
  test(entity) {
    return !!entity.components.position
  }

  update(entity) {
    let $anchor, $x, $y
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

    $anchor = anchor || [0.5, 0.5]

    if (x !== undefined) $x = x
    if (y !== undefined) $y = y

    if (left !== undefined) $x = bounds.left + left
    if (right !== undefined) $x = bounds.right - right
    if (top !== undefined) $y = bounds.top + top
    if (bottom !== undefined) $y = bounds.bottom - bottom

    entity.anchor.set(...$anchor)
    if ($x) entity.position.x = $x
    if ($y) entity.position.y = $y
  }
}

export default PositionSystem
