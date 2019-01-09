import Animation from './Animation'

const IN = 'in'
const OUT = 'out'

/**
 * Fade animaiton.
 *
 * @example
 * const displayObject = FT.create(Text, 'Hello, World')
 * const fade = new AnimationFade('in', { duration: 500 })
 * displayObject.addComponent(fade)
 */
class AnimationFade extends Animation {
  /**
   * @param {string} type animation type - in / out.
   * @param {Object} options
   * @param {number} options.duration=1000 duration of animation in milliseconds.
   */
  constructor(type, { duration = 1000 } = {}) {
    super()

    /**
     * @access private
     */
    this.$alphaStart = 0

    /**
     * @access private
     */
    this.$alphaEnd = 1

    /**
     * @access private
     */
    this.$duration = 0

    switch (type) {
      case IN:
        this.$alphaStart = 0
        this.$alphaEnd = 1
        break
      case OUT:
        this.$alphaStart = 1
        this.$alphaEnd = 0
        break
    }
    this.$duration = duration
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)
    displayObject.alpha = this.$alphaStart
    const alpha = this.$alphaEnd
    const duration = this.$duration
    this.tween.to({ alpha }, duration).start()
  }
}

export default AnimationFade
