import { Tween } from '../'

export function fadeIn(displayObject, duration = 250) {
  return new Tween(displayObject).to({ alpha: 1 }, duration)
}

export function fadeOut(displayObject, duration = 250) {
  return new Tween(displayObject).to({ alpha: 0 }, duration)
}
