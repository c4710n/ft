import { FT } from '../core'
import { System } from '../ecs'

class PositionSystem extends System {
  test(entity) {
    return !!entity.components.position
  }

  update(entity) {
    const { top, bottom, left, right } = entity.components.position
    const { bounds } = FT.stage

    let x, y
    if (top !== undefined) y = bounds.top + top
    if (bottom !== undefined) y = bounds.bottom - bottom
    if (left !== undefined) x = bounds.left + left
    if (right !== undefined) x = bounds.right - right

    if (x) {
      entity.position.x = x
    }

    if (y) {
      entity.position.y = y
    }
  }
}

export default PositionSystem
