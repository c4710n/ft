import { FT } from '../core'
import { HUD } from '../components'
import System from './System'

/**
 * System for HUD component.
 */
class HUDSystem extends System {
  constructor() {
    super('hud')
  }

  update() {
    this.positionAll()
  }

  positionAll() {
    this.entities.forEach(entity => {
      const hud = entity.components.find(component => component instanceof HUD)

      if (hud) {
        this.positionOne(entity, hud.meta)
      }
    })
  }

  positionOne(entity, meta) {
    let $x, $y
    const { left, right, top, bottom, percentage } = meta
    const { bounds } = FT.systems.scale

    if (left !== undefined) {
      const offset = percentage ? bounds.width * left : left
      $x = bounds.left + offset
    }

    if (right !== undefined) {
      const offset = percentage ? bounds.width * right : right
      $x = bounds.right - offset
    }

    if (top !== undefined) {
      const offset = percentage ? bounds.height * top : top
      $y = bounds.top + offset
    }

    if (bottom !== undefined) {
      const offset = percentage ? bounds.height * bottom : bottom
      $y = bounds.bottom - offset
    }

    if ($x) entity.x = $x
    if ($y) entity.y = $y
  }
}

export default HUDSystem
