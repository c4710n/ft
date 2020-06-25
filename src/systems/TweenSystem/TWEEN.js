// delegate es6-tween
import TWEEN from '@tweenjs/tween.js'

// candy for loop
if (!TWEEN.Tween.prototype.loop) {
  TWEEN.Tween.prototype.loop = function loop() {
    this.repeat(Number.POSITIVE_INFINITY)
    return this
  }
}

// Promisify start()
if (!TWEEN.Tween.prototype.startAsync) {
  TWEEN.Tween.prototype.startAsync = function() {
    return new Promise(resolve => {
      this.onComplete(resolve)
      this.start()
    })
  }
}

export const Tween = TWEEN.Tween
export const Easing = TWEEN.Easing

/**
 * @external {TWEEN} https://github.com/tweenjs/es6-tween
 */
export default TWEEN
