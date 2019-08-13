import { PIXI } from '../core'

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
    this.allowInteraction = false
    this.setInteractive(true)
  }

  async _translateIn() {
    if (this.translateIn) {
      await this.translateIn()
    }

    this.allowInteraction = true
  }

  async _translateOut() {
    this.allowInteraction = false

    if (this.translateOut) {
      await this.translateOut()
    }
  }
}

export default Scene
