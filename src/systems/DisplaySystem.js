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
    displayObject.anchor.set(...$anchor)

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
