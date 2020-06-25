import { Tween } from '../systems/TweenSystem/TWEEN'

/**
 * Fake progress emitter based on timeout.
 *
 * @example
 * const progress = new TimerProgress(3000)
 *
 * // listen on progress event
 * progress.on('progress', function({ progress: value }) {console.log(value)}, this)
 *
 * // start timer
 * timer.start()
 */
class TimeProgress extends Tween {
  /**
   * @param {number} timeout timeout in milliseconds.
   */
  constructor(timeout) {
    super({ progress: 0 })
    this.to({ progress: 100 }, timeout)

    if (!this.onProgress) {
      this.onProgress = {}
    }
    this.onProgress.add = f => this.onUpdate(f)

    if (!this.onComplete) {
      this.onComplete = {}
    }
    this.onComplete.add = f => this.onComplete(f)
  }
}

export default TimeProgress
