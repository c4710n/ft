import Component from './Component'
import { Tween } from '#/animation'

class Animation extends Component {
  onAdded(displayObject) {
    super.onAdded()
    this.tween = new Tween(displayObject)
  }

  onRemoved() {
    super.onRemoved()
    this.tween.stop()
  }

  complete() {
    return new Promise(resolve => {
      this.tween.on('complete', () => {
        resolve()
      })
    })
  }
}

export default Animation
