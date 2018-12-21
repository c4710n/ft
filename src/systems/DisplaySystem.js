import { FT } from '#/core'
import { System } from '#/ecs'

class DisplaySystem extends System {
  test(entity) {
    return !!entity.components.display
  }

  enter(entity) {
    const { display } = entity.components

    const defaultAnchor = [0.5, 0.5]
    const { $anchor = defaultAnchor } = display

    if (display.anchor) {
      display.anchor.set(...$anchor)
    } else {
      const [percentX, percentY] = $anchor
      const { width, height } = display
      const pivotX = width * percentX
      const pivotY = height * percentY
      display.pivot.set(pivotX, pivotY)
    }

    FT.internal.stage.addChild(display)
  }

  exit(entity) {
    const { display } = entity.components
    const { parent } = display

    if (parent) {
      parent.removeChild(display)
    }
  }
}

export default DisplaySystem
