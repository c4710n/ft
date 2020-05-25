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
class TimeProgress {
  /**
   * @param {number} timeout timeout in milliseconds.
   */
  constructor(timeout) {
    const timerStart = { progress: 0 }
    const timerEnd = { progress: 100 }
    this.timer = new Tween(timerStart).to(timerEnd, timeout)
  }

  transformEvent(event) {
    switch (event) {
      case 'progress':
        return 'update'

      default:
        return event
    }
  }

  on(event, listener, context) {
    event = this.transformEvent(event)
    this.timer.on(event, listener, context)
  }

  off(event, listener, context) {
    event = this.transformEvent(event)
    this.timer.off(event, listener, context)
  }

  start() {
    this.timer.start()
  }

  stop() {
    this.timer.stop()
  }
}

export default TimeProgress
