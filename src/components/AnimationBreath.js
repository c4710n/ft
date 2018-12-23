import Component from './Component'
import { Tween } from '#/animation'

class AnimationBreath extends Component {
  #duration
  #tween

  constructor({ duration = 1000 } = {}) {
    super()
    this.#duration = duration
  }

  onAdded(displayObject) {
    displayObject.alpha = 0

    const tween = new Tween(displayObject)
    this.#tween = tween
    const alpha = 1
    const duration = this.#duration
    tween
      .to({ alpha }, duration)
      .yoyo(true)
      .repeat(Infinity)
      .start()
  }

  onRemoved() {
    this.#tween.stop()
  }
}

export default AnimationBreath
