import Animation from './Animation'
import { Easing } from '#/animation'

class AnimationBreath extends Animation {
  #duration

  constructor({ duration = 1000 } = {}) {
    super()
    this.#duration = duration
  }

  onAdded(displayObject) {
    super.onAdded(displayObject)
    displayObject.alpha = 0

    const alpha = 1
    const duration = this.#duration
    this.tween
      .to({ alpha }, duration)
      .easing(Easing.Cubic.InOut)
      .yoyo(true)
      .repeat(Infinity)
      .start()
  }
}

export default AnimationBreath
