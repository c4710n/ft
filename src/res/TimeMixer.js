import { Tween } from '../animation'

/**
 * Fake progress emitter based on timeout.
 *
 * @example
 * const tm = new TimeMixer(3000)
 *
 * // listen on progress event
 * tm.onProgress.add(({ progress: value }) => {
 *   console.log(value)
 * })
 *
 * // listen on complete event
 * tm.onComplete.add(({ progress: value }) => {
 *   console.log(value)
 * })
 *
 * // start timer
 * timer.load()
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
    this.onProgress.add = (f) => this.onUpdate(f)

    if (!this.onComplete) {
      this.onComplete = {}
    }
    this.onComplete.add = (f) => this.onComplete(f)
  }

  load() {
    this.start()
  }
}

export default TimeMixer
