import classname from './classname'

class Timer {
  #start
  #now
  #limit

  constructor(limit) {
    if (typeof limit !== 'number') {
      throw new Error(`[${classname(this)}] limit is required`)
    }
    this.#limit = limit
  }

  start() {
    this.#start = performance.now()
  }

  reset() {
    this.start()
  }

  tick() {
    this.#now = performance.now()
  }

  get duration() {
    return this.#now - this.#start
  }

  exceed() {
    return this.duration > this.#limit
  }
}

export default Timer
