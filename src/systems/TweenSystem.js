import TWEEN from '#/animation/TWEEN'
import System from './System'

class TweenSystem extends System {
  update() {
    TWEEN.update(performance.now())
  }
}

export default TweenSystem
