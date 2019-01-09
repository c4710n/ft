import Animation from './Animation'
import { Easing } from '#/animation'

/**
 * Breath animation.
 *
 * @example
 * const displayObject = FT.create(Text, 'Hello World')
 * const breath = new AnimationBreath({ duration: 500 })
 * displayObject.addComponent(breath)
 */
class AnimationBreath extends Animation {
  /**
   * @param {Object} options
   * @param {number} options.duration=1000 duration of animation in milliseconds.
   */
  constructor({ duration = 1000 } = {}) {
    super()

    /**
     * @access private
     */
    this.$duration = duration
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)
    displayObject.alpha = 0

    const alpha = 1
    const duration = this.$duration
    this.tween
      .to({ alpha }, duration)
      .easing(Easing.Cubic.InOut)
      .yoyo(true)
      .repeat(Infinity)
      .start()
  }
}

export default AnimationBreath
