// delegate es6-tween
import { update, add, remove, has, Tween } from 'es6-tween'

const TWEEN = { update, add, remove, has }

if (!Tween.prototype.loop) {
  // candy for repeat forever
  Tween.prototype.loop = function loop() {
    this.repeat(Number.POSITIVE_INFINITY)
    return this
  }
}

/**
 * This is a workaround for stop().
 * When calling tween.stop(), it will trigger an error sometimes.
 */
if (!Tween.prototype.halt) {
  Tween.prototype.halt = function halt() {
    this.pause()
    remove(this)
    return this.emit('stop', this.object)
  }
}

if (!Tween.prototype.startAsync) {
  Tween.prototype.startAsync = function() {
    return new Promise(resolve => {
      this.on('complete', resolve).start()
    })
  }
}

export { Tween, Easing, Interpolation } from 'es6-tween'

/**
 * @external {TWEEN} https://github.com/tweenjs/es6-tween
 */
export default TWEEN
