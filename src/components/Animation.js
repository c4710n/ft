import Component from './Component'
import { Tween } from '#/animation'

class Animation extends Component {
  onAdded(displayObject) {
    super.onAdded(displayObject)
    this.tween = new Tween(displayObject)
  }

  onRemoved(displayObject) {
    this.tween.stop()
    super.onRemoved(displayObject)
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
