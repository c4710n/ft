import app from '../app'

/**
 * A delay timer based on FT.ticker.
 *
 * @param {number} ms specified time in milliseconds.
 * @return {Promise} a promise will be resolved when timeout.
 */
function delay(ms) {
  return new Promise((resolve) => {
    const start = performance.now()
    const timer = () => {
      const now = performance.now()
      if (now - start > ms) {
        resolve()
        app.ticker.remove(timer)
      }
    }

    app.ticker.add(timer)
  })
}

export default delay
