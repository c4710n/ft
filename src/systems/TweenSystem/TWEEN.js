import TWEEN, { Tween as $Tween, Easing as $Easing } from '@tweenjs/tween.js'

// candy for loop
if (!$Tween.prototype.loop) {
  $Tween.prototype.loop = function loop() {
    this.repeat(Number.POSITIVE_INFINITY)
    return this
  }
}

// Promisify start()
if (!$Tween.prototype.startAsync) {
  $Tween.prototype.startAsync = function () {
    return new Promise((resolve) => {
      this.onComplete(resolve)
      this.start()
    })
  }
}

export const Tween = $Tween
export const Easing = $Easing

export default TWEEN
