import Component from './Component'
import { Tween } from '#/animation'

/**
 * Basic class for all animations.
 *
 * @interface
 */
class Animation extends Component {
  onAdded(displayObject) {
    super.onAdded(displayObject)

    /**
     * default tween created for current display object.
     *
     * @type {Tween}
     */
    this.tween = new Tween(displayObject)
  }

  onRemoved(displayObject) {
    this.tween.stop()
    super.onRemoved(displayObject)
  }

  /**
   * Promised complete.
   *
   * @return {Promise} a promise will be resolved when tween is completed.
   */
  complete() {
    return new Promise(resolve => {
      this.tween.on('complete', () => {
        resolve()
      })
    })
  }
}

export default Animation
