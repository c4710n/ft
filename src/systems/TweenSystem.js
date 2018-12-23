import System from './System'
import TWEEN from '#/animation/TWEEN'

class TweenSystem extends System {
  update() {
    TWEEN.update(performance.now())
  }
}

export default TweenSystem
