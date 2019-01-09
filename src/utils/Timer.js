import classname from './classname'

/**
 * A timer via
 *
 * @example
 * const timer = new Timer(500)
 *
 * // start timer
 * timer.start()
 *
 * // check if timer is exceed the timeout
 * if (timer.exceed()) {
 *   console.log('exceed...')
 * }
 *
 * //reset timer
 * timer.reset()
 */
class Timer {
  /**
   * @param {number} timeout timeout in milliseconds.
   */
  constructor(timeout) {
    if (typeof timeout !== 'number') {
      throw new Error(`[${classname(this)}] timeout is required`)
    }

    /**
     * @access private
     */
    this.$timeout = timeout

    /**
     * @access private
     */
    this.$start = 0
  }

  start() {
    this.$start = performance.now()
  }

  reset() {
    this.start()
  }

  get duration() {
    const now = performance.now()
    return now - this.$start
  }

  exceed() {
    return this.duration > this.$timeout
  }
}

export default Timer
