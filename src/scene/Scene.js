import { PIXI } from '../core'
import state from '../state'

const { Container } = PIXI

/**
 * Scene is abstraction of container.
 *
 * @example
 * // Scene is just a normal container.
 * class Playground extends Scene {
 *   onAdded() {
 *     // ...
 *   }
 * }
 *
 * @example
 * // If you wanna extend Scene's constructor, please make sure `super(name)`
 * // is called. Because attribute `name` is required by SceneManager.
 * class Playground extends Scene {
 *   constructor(name) {
 *     super(name)
 *
 *     this.toggle = true
 *   }
 * }
 */
class Scene extends Container {
  constructor(name) {
    super()

    this.name = name
    this.setInteractive(true)

    state.allowInteraction = false
  }

  async _translateIn() {
    if (this.translateIn) {
      await this.translateIn()
    } else {
      await Promise.resolve()
    }

    state.allowInteraction = true
  }

  async _translateOut() {
    state.allowInteraction = false

    if (this.translateOut) {
      await this.translateOut()
    } else {
      await Promise.resolve()
    }
  }
}

export default Scene
