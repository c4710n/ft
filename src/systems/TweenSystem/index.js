import { FT } from '../../core'
import System from '../System'
import TWEEN, { Tween, Easing } from './TWEEN'

/**
 * System for Tween.
 */
class TweenSystem extends System {
  constructor() {
    super('tween')

    FT.Tween = Tween
    FT.Easing = Easing
  }

  update() {
    TWEEN.update(performance.now())
  }
}

export default TweenSystem
