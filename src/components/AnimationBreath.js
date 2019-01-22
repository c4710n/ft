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
  constructor({ duration = 1000, from = 0, to = 1 } = {}) {
    super()

    /**
     * @access private
     */
    this.$duration = duration
    this.$from = from
    this.$to = to
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)
    displayObject.alpha = this.$from

    const alpha = this.$to
    const duration = this.$duration
    this.tween
      .to({ alpha })
      .duration(duration)
      .easing(Easing.Cubic.InOut)
      .yoyo(true)
      .repeat(Infinity)
      .start()
  }
}

export default AnimationBreath
