import Animation from './Animation'
import random from '@m31271n/random-number'

/**
 * @example
 * const shake = new Shake({ offset: 3 })
 * displayObject.addComponent(shake)
 */
class AnimationShake extends Animation {
  #offset
  #originX
  #originY

  /**
   * @param {Object} args
   * @param {number} [args.offset=3] max offset of shaking
   */
  constructor({ offset = 3 } = {}) {
    super()
    this.#offset = offset
    this.#originX = 0
    this.#originY = 0
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)
    this.#originX = displayObject.x
    this.#originY = displayObject.y
  }

  onUpdate() {
    if (!this.displayObject) return

    const offset = this.#offset

    const offsetX = random({
      min: -offset,
      max: offset,
      float: true,
      includeMax: true,
    })

    const offsetY = random({
      min: -offset,
      max: offset,
      float: true,
      includeMax: true,
    })

    this.displayObject.x = this.#originX + offsetX
    this.displayObject.y = this.#originY + offsetY
  }
}

export default AnimationShake
