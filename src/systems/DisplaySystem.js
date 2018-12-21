import { FT } from '#/core'
import { System } from '#/ecs'

class DisplaySystem extends System {
  test(entity) {
    return !!entity.components.displayObject
  }

  enter(entity) {
    const { displayObject } = entity.components

    const defaultAnchor = [0.5, 0.5]
    const { $anchor = defaultAnchor } = displayObject

    if (displayObject.anchor) {
      displayObject.anchor.set(...$anchor)
    } else {
      const [percentX, percentY] = $anchor
      const { width, height } = displayObject
      const pivotX = width * percentX
      const pivotY = height * percentY
      displayObject.pivot.set(pivotX, pivotY)
    }

    FT.internal.stage.addChild(displayObject)
  }

  exit(entity) {
    const { displayObject } = entity.components
    const { parent } = displayObject

    if (parent) {
      parent.removeChild(displayObject)
    }
  }
}

export default DisplaySystem
