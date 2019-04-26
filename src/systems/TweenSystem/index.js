import System from '../System'
import TWEEN from './TWEEN'

/**
 * System for Tween.
 */
class TweenSystem extends System {
  constructor() {
    super('tween')
  }

  update() {
    TWEEN.update(performance.now())
  }
}

export default TweenSystem
