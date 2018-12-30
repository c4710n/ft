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
  #stop

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
    this.#stop = false
    this.#originX = displayObject.x
    this.#originY = displayObject.y
  }

  onRemoved(displayObject) {
    this.#stop = true
    super.onRemoved(displayObject)
  }

  onUpdate() {
    if (this.#stop) return
    if (!this.displayObject || !this.displayObject.added) return

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

    const x = this.#originX + offsetX
    const y = this.#originY + offsetY

    this.displayObject.position.set(x, y)
  }
}

export default AnimationShake
