import Animation from './Animation'
import random from '@m31271n/random-number'

/**
 * Shake animation.
 *
 * @example
 * const displayObject = FT.create(Text, 'Hello, World')
 * const shake = new Shake(3)
 * displayObject.addComponent(shake)
 */
class AnimationShake extends Animation {
  /**
   * @param {number} offset=3 max offset of shaking
   */
  constructor(offset = 3) {
    super()

    /**
     * @access private
     */
    this.$offset = offset

    /**
     * @access private
     */
    this.$originX = 0

    /**
     * @access private
     */
    this.$originY = 0
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)
    this.$originX = displayObject.x
    this.$originY = displayObject.y
  }

  onRemoved(displayObject) {
    super.onRemoved(displayObject)
  }

  onUpdate() {
    if (!this.added) return
    if (!this.displayObject || !this.displayObject.added) return

    const offset = this.$offset

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

    const x = this.$originX + offsetX
    const y = this.$originY + offsetY

    this.displayObject.position.set(x, y)
  }
}

export default AnimationShake
