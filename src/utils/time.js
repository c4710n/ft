import { FT } from '#/core'

/**
 * A delay timer based on FT.ticker.
 *
 * @param {number} ms specified time in milliseconds.
 * @return {Promise} a promise will be resolved when timeout.
 */
export function delay(ms) {
  return new Promise(resolve => {
    const start = performance.now()
    const timer = () => {
      const now = performance.now()
      if (now - start > ms) {
        resolve()
        FT.ticker.remove(timer)
      }
    }

    FT.ticker.add(timer)
  })
}

export default {
  delay,
}
