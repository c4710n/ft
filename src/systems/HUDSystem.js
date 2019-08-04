import app from '../app'
import System from './System'

function checkPercentage(value) {
  const num = Number.parseFloat(value)

  if (
    typeof value === 'string' &&
    value.endsWith('%') &&
    typeof num === 'number' &&
    num <= 100 &&
    num >= 0
  ) {
    const percentage = num / 100
    return [true, percentage]
  } else {
    return [false]
  }
}

class HUDSystem extends System {
  constructor() {
    super('hud')
  }

  update() {
    this.entities.forEach(entity => {
      const hudComponent = entity.components[this.name]
      this.positionOne(entity, hudComponent.meta)
    })
  }

  positionOne(entity, meta) {
    let $x, $y
    const { left, right, top, bottom } = meta
    const { bounds } = app.systems.scale

    if (left !== undefined) {
      const [isPercentage, percentage] = checkPercentage(left)
      const offset = isPercentage ? bounds.width * percentage : left
      $x = bounds.left + offset
    }

    if (right !== undefined) {
      const [isPercentage, percentage] = checkPercentage(right)
      const offset = isPercentage ? bounds.width * percentage : right
      $x = bounds.right - offset
    }

    if (top !== undefined) {
      const [isPercentage, percentage] = checkPercentage(top)
      const offset = isPercentage ? bounds.height * percentage : top
      $y = bounds.top + offset
    }

    if (bottom !== undefined) {
      const [isPercentage, percentage] = checkPercentage(bottom)
      const offset = isPercentage ? bounds.height * percentage : bottom
      $y = bounds.bottom - offset
    }

    if ($x) entity.x = $x
    if ($y) entity.y = $y
  }
}

export default HUDSystem
