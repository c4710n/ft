import Component from './Component'
import { Tween } from '#/animation'

const IN = 'in'
const OUT = 'out'

class AnimationFade extends Component {
  #alphaStart
  #alphaEnd
  #duration
  #tween

  constructor({ type = IN, duration = 1000 } = {}) {
    super()
    switch (type) {
      case IN:
        this.#alphaStart = 0
        this.#alphaEnd = 1
        break
      case OUT:
        this.#alphaStart = 1
        this.#alphaEnd = 0
        break
    }
    this.#duration = duration
  }

  onAdded(displayObject) {
    displayObject.alpha = this.#alphaStart

    const tween = new Tween(displayObject)
    this.#tween = tween
    const alpha = this.#alphaEnd
    const duration = this.#duration
    tween.to({ alpha }, duration).start()
  }

  onRemoved() {
    this.#tween.stop()
  }
}

export default AnimationFade
