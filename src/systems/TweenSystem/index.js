import app from '../../app'
import System from '../System'
import TWEEN, { Tween, Easing } from './TWEEN'

class TweenSystem extends System {
  constructor() {
    super('tween')

    app.Tween = Tween
    app.Easing = Easing
  }

  update() {
    TWEEN.update(performance.now())
  }
}

export default TweenSystem
