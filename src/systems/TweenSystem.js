import TWEEN from '#/animation/TWEEN'
import System from './System'

/**
 * System for Tween.
 */
class TweenSystem extends System {
  update() {
    TWEEN.update(performance.now())
  }
}

export default TweenSystem
