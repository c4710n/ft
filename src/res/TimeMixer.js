import { Tween } from '../animation'

/**
 * Fake progress emitter based on timeout.
 *
 * @example
 * const progress = new TimeMixer(3000)
 *
 * // listen on progress event
 * progress.on('progress', function({ progress: value }) {
 *   console.log(value)
 * }, this)
 *
 * // start timer
 * timer.start()
 */
class TimeMixer extends Tween {
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

  load() {
    this.start()
  }
}

export default TimeMixer
