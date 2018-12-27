import Animation from './Animation'

const IN = 'in'
const OUT = 'out'

class AnimationFade extends Animation {
  #alphaStart
  #alphaEnd
  #duration

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
    super.onAdded(displayObject)
    displayObject.alpha = this.#alphaStart
    const alpha = this.#alphaEnd
    const duration = this.#duration
    this.tween.to({ alpha }, duration).start()
  }
}

export default AnimationFade
